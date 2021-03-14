
const { transporter } = require('../utils/nodemailer')
const logger = require('../utils/logger')

/**
 * 
 * @param {*} contact_info 
 */
const sendContactInfo = async (contact_info) => {

  try {
    transporter.sendMail({
      to: 'mikkonen.firebase@gmail.com',
      subject: `New contact request: ${contact_info.name}`,
      html: `<div><h1> Message:</h1><p> ${contact_info.message}</p>  <div> <Strong>From: ${contact_info.email}</Strong></div></div>`
    })
  } catch (err) {
    logger.error({ err })
  }
}

module.exports = {
  sendContactInfo
} 