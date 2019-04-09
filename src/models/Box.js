const mongoose = require('mongoose')

const BoxSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FileSchema' }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('BoxSchema', BoxSchema)
