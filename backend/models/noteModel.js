const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    owedTo: String,
    amount: { type: Number, required: true },
    dateDue: Date,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Note", noteSchema)
