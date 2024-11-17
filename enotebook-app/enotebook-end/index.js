const express = require('express')
const router = require('./Routes/route')
const note_router = require('./Routes/notes')
const connectToDB = require('./db')
var cors = require('cors')
var app = express()
 
app.use(cors())
app.use(express.json())
const port = 5000

connectToDB();

app.use('/',router);
app.use('/',note_router);
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})