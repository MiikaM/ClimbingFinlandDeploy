const mongoose = require('mongoose')
const UserBase = require('./userBase')

/**
 * Model for an admin user.
 */
const AdminUser = UserBase.discriminator('AdminUser',
  new mongoose.Schema({
    password: {
      type: String,
      required: true,
      unique: true,
      minlength: 8
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      default: 'Admin'
    }
  }).set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject.password
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
)


module.exports = AdminUser