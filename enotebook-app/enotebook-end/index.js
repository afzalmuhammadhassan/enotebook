const express = require('express')
const router = require('./Routes/route')
const note_router = require('./Routes/notes')
const connectToDB = require('./db')
const app = express()
app.use(express.json())
const port = 5000

connectToDB();

app.use('/',router);
app.use('createuser',router);
app.use('getuser',router);
app.use('login',router);
app.use('/',note_router);
app.use('createnote',note_router);
app.use('deletenote',note_router);
app.use('updatenote',note_router);
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})