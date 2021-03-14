const mongoose = require('mongoose')

/**
 * Model for a comment.
 */
const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    minlength: 3,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserBase',
    required: true
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment