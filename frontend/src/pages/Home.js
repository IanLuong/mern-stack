import { useEffect, useState } from "react"
import { useNoteContext } from "../hooks/useNoteContext"
import { useAuthContext } from "../hooks/useAuthContext"

import NoteDetails from "../components/NoteDetails"
import NoteForm from "../components/NoteForm"
import SummaryPanel from "../components/SummaryPanel"

import { sortNotes } from "../utils/noteUtils"

import Select from "react-select"

const sortOptions = [
  { value: "dateDue", label: "Date Due" },
  { value: "createdAt", label: "Date Created" },
  { value: "owedTo", label: "Owed To" },
  { value: "amount", label: "Amount" },
]

export default function Home() {
  const [sortOption, setSortOption] = useState(sortOptions[0])
  const [filterOption, setFilterOption] = useState("")

  const { notes, dispatch } = useNoteContext()
  const { user } = useAuthContext()

  const [filteredNotes, setFilteredNotes] = useState(null)

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("/api/notes", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: "SET_NOTES", payload: json })
      }
    }

    if (user) {
      fetchNotes()
    }
  }, [dispatch, user])

  useEffect(() => {
    if (notes) {
      setFilteredNotes(sortNotes(notes, sortOption.value))
    }
  }, [sortOption, notes])

  return (
    <div className="home">
      <div className="side">
        <NoteForm />
        {/* {filteredNotes && filteredNotes.length > 0 && <SummaryPanel/>} */}
      </div>

      <main>
        {/* Add filter functionality */}
        <div className="sorting">
          <span className="sorting-option sort-button">
            <span className="material-symbols-outlined">Sort</span>
            <Select
              defaultValue={sortOption}
              onChange={setSortOption}
              options={sortOptions}
            />
          </span>
          <span className="sorting-option sort-button">
            <span className="material-symbols-outlined">filter_alt</span>
          </span>
        </div>
        <div className="notes">
          {filteredNotes &&
            filteredNotes.map((note) => (
              <NoteDetails key={note._id} note={note} />
            ))}
        </div>
      </main>
    </div>
  )
}
