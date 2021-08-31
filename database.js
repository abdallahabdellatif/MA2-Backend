const mongoose = require('mongoose')

const connectDB = async () => {
  mongoose.connect('mongodb://localhost:27017/BookDB', async (err) => {
    if (err) {
      console.log(err)
    }
    console.log('DB connected successfully')
  })
}
module.exports = connectDB
