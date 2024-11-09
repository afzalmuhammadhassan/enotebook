const express = require('express')
const router = require('./Routes/route')
const app = express()
const port = 5000

app.use('/',router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})