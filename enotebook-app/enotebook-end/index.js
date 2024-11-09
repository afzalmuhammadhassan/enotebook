const express = require('express')
const router = require('./Routes/route')
const connectToDB = require('./db')
const app = express()
const port = 5000
app.use(express.json())
app.use('/',router);
app.use('/createuser',router);

connectToDB();

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})