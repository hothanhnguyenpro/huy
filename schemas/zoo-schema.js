const mongoose = require('mongoose')

const zooSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  zoo: {
    type: [Object],
    required: true,
  },
})

module.exports = mongoose.model('zoo', zooSchema)