const multer = require('multer')

/**
 * Multer tutorial by https://codeburst.io/image-uploading-using-react-and-node-to-get-the-images-up-c46ec11a7129
 * Create a storage for the image.
 */
const storage = multer.diskStorage({
  destination: ((req, file, cb) => {
    cb(null, process.env.UPLOAD_FOLDER)
  }),
  filename: ((req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  })
})

/**
 * Checks image integrity
 * @param {*} req 
 * @param {*} file 
 * @param {*} cb 
 */
const filter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

/**
 * Checks the size of the image and uploads it.
 */
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: filter
})

module.exports = upload

