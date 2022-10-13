const Note = require("../models/noteModel")
const mongoose = require("mongoose")

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({}).sort({ createdAt: -1 })
    res.status(200).json(notes)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

//TODO: Create different endpoints for sorting criteria
const getNotesByDate = async (req, res) => {
  try {
    const user_id = req.user._id
    const notes = await Note.find({ user_id }).sort({ dateDue: 1 })
    res.status(200).json(notes)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getNote = async (req, res) => {}

const createNote = async (req, res) => {
  const { title, owedTo, amount, dateDue } = req.body

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

  if (!amount.match(/^\d+(\.\d{1,2})?$/)) {
    return res
      .status(400)
      .json({ error: "Please use a full number", emptyFields: ["amount"] })
  }

  try {
    console.log(req)
    const user_id = req.user._id
    const note = await Note.create({ title, owedTo, amount, dateDue, user_id })
    res.status(200).json(note)
  } catch (err) {
    res.status(400).json({ error: err.message, emptyFields: [] })
  }
}

const deleteNote = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such note" })
  }

  const note = await Note.findOneAndDelete({ _id: id })
  if (!note) {
    return res.status(404).json({ error: "No such note" })
  }
  res.status(200).json(note)
}

const updateNote = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such note" })
  }

  const note = await Note.findOneAndUpdate({ _id: id })
  if (!note) {
    return res.status(404).json({ error: "No such note" })
  }
  res.status(200).json(note)
}

module.exports = {
  getNotes,
  getNotesByDate,
  createNote,
  deleteNote,
  updateNote,
}
