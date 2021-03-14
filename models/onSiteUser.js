const mongoose = require('mongoose')
const UserBase = require('./userBase')

/**
 * Model for an on-site user.
 */
const OnSiteUser = UserBase.discriminator('OnSiteUser',
  new mongoose.Schema({
    password: {
      type: String,
      required: true,
      unique: true,
      minlength: 8
    },
    role: {
      type: String,
      default: 'EndUser'
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


module.exports = OnSiteUser