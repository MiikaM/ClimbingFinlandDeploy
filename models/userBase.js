const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const options = { discriminatorKey: 'type', collection: 'users' }

/**
 * Model for an user.
 */
const userBaseSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 6
  },
  name: {
    type: String,
    minlength: 3,
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: 'uploads/avatar.svg'
  },
  city: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  favouritePlaces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place'
    }
  ],
}, options)

userBaseSchema.plugin(uniqueValidator)

userBaseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.password
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const UserBase = mongoose.model('UserBase', userBaseSchema)

module.exports = UserBase