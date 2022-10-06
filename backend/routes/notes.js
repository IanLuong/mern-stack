const express = require("express")
const {
  getNotes,
  createNote,
  deleteNote,
} = require("../controllers/noteController")
const router = express.Router()

router.get("/", getNotes)
// router.get("/:id", getNote)
router.post("/", createNote)
router.delete("/:id", deleteNote)
// router.patch("/:id", updateNote)

module.exports = router
