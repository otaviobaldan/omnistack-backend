const express = require('express')
const multer = require('multer')
const multerConfig = require('../src/config/multer')

const routes = express.Router()

// Controllers
const BoxController = require('../src/controllers/BoxController')
const FileController = require('../src/controllers/FileController')

routes.get('/', (req, res) => {
  return res.send('Welcome to Omnistack application')
})

routes.post('/boxes', BoxController.store)
routes.get('/boxes/:id', BoxController.show)

routes.post(
  '/boxes/:id/files',
  multer(multerConfig).single('file'),
  FileController.store
)

module.exports = routes
