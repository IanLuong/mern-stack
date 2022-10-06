const Note = require("../models/noteModel")
const mongoose = require("mongoose")

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({})
    res.status(200).json(notes)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getNote = async (req, res) => {}

const createNote = async (req, res) => {
  const { title, owedTo, amount } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push("title")
  }
  if (!amount) {
    emptyFields.push("amount")
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in required fields", emptyFields })
  }

  try {
    const note = await Note.create({ title, owedTo, amount })
    res.status(200).json(note)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteNote = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such workout" })
  }

  const note = await Note.findOneAndDelete({ _id: id })
  if (!note) {
    return res.status(404).json({ error: "No such note" })
  }
  res.status(200).json(note)
}

const updateNote = async (req, res) => {}

module.exports = { getNotes, createNote, deleteNote }
