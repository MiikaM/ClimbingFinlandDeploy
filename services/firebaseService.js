const admin = require('firebase-admin')

/**
 * Initializes firebase.
 */
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://climbingfinland-cf142.firebaseio.com'
})

module.exports = admin