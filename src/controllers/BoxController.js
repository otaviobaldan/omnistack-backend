const BoxSchema = require('../models/Box')

class BoxController {
  async store (req, res) {
    const box = await BoxSchema.create(req.body)

    return res.json(box)
  }

  async show (req, res) {
    const box = await BoxSchema.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } }
    })

    return res.json(box)
  }
}

module.exports = new BoxController()
