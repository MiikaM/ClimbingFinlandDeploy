const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_REDIRECT_URL,
)

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN
})

const accessToken = oauth2Client.getAccessToken()

// const mailgunAuth = {
//   auth: {
//     api_key: process.env.MAILGUN_API_KEY,
//     domain: process.env.MAILGUN_DOMAIN
//   }
// }

// const transporter = nodemailer.createTransport(mg(mailgunAuth))
//Usess an transporter to use for sending emails. 
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: "OAuth2",
    user: process.env.RECIPIENT_EMAIL,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: accessToken
  },
  // tls: {
  //   rejectUnauthorized: false
  // }
})


module.exports = { transporter }