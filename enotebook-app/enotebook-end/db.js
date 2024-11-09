const mongoose = require('mongoose')

const uri = "mongodb://localhost:27017/E_Note_Book"
const connectToDB = () =>{
    mongoose.connect(uri)
}

module.exports = connectToDB;