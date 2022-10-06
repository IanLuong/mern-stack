const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    owedTo: { type: String, default: "Unknown" },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Note", noteSchema)
