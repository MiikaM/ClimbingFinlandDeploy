const mongoose = require('mongoose')
const UserBase = require('./userBase')

/**
 * Model for a thirdparty user.
 */
const ThirdPartyUser = UserBase.discriminator('ThirdPartyUser',
  new mongoose.Schema({
    idSub: {
      type: String,
      required: true,
      unique: true
    }, 
    role: {
      type: String,
      default: 'EndUser'
    }
  }).set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
)


module.exports = ThirdPartyUser