const monogoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const AdSchema = new monogoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: monogoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: true

  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

AdSchema.plugin(mongoosePaginate)

module.exports = monogoose.model('Ad', AdSchema)
