const express = require("express")
const {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
  getNotesByDate,
} = require("../controllers/noteController")
const router = express.Router()

router.get("/", getNotesByDate)
// router.get("/:id", getNote)
router.post("/", createNote)
router.delete("/:id", deleteNote)
router.patch("/:id", updateNote)

module.exports = router
