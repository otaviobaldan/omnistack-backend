const FileSchema = require('../models/File')
const BoxSchema = require('../models/Box')

class FileController {
  async store (req, res) {
    const box = await BoxSchema.findById(req.params.id)

    const file = await FileSchema.create({
      title: req.file.originalname,
      path: req.file.key
    })

    box.files.push(file)

    await box.save()

    // transmite a mensagem para todos conectados na box
    req.io.sockets.in(box._id).emit('file', file)

    return res.json(file)
  }
}

module.exports = new FileController()
