const nodemailer = require('nodemailer')

//Usess an transporter to use for sending emails. 
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USERNAME, // generated ethereal user
    pass: process.env.GMAIL_PASSWORD, // generated ethereal password
  },
})


module.exports = { transporter }