import { useEffect, useState } from "react"
import { useNoteContext } from "../hooks/useNoteContext"
import { useAuthContext } from "../hooks/useAuthContext"

import NoteDetails from "../components/NoteDetails"
import NoteForm from "../components/NoteForm"
import SummaryPanel from "../components/SummaryPanel"

import { sortNotes, filterNotes } from "../utils/noteUtils"

import Select from "react-select"

const sortOptions = [
  { value: "dateDue", label: "Date Due" },
  { value: "createdAt", label: "Date Created" },
  { value: "owedTo", label: "Owed To" },
  { value: "amount", label: "Amount" },
]

const filterOptions = [
  { value: "dateDue", label: "Time Limit" },
  { value: "owedTo", label: "Owed To" },
  //TODO: Add option to filter by amount
]

export default function Home() {
  const [sortOption, setSortOption] = useState(sortOptions[0])
  const [filterOption, setFilterOption] = useState("")

  const { notes, dispatch } = useNoteContext()
  const { user } = useAuthContext()

  const [filteredNotes, setFilteredNotes] = useState(null)

  //Handles initial fetching of notes
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

  //Handles sorting and filtering functionality
  useEffect(() => {
    if (notes) {
      setFilteredNotes(
        sortNotes(filterNotes(notes, filterOption), sortOption.value)
      )
    }
  }, [sortOption, notes, filterOption])

  return (
    <div className="home">
      <div className="side">
        <NoteForm />
        {/* {filteredNotes && filteredNotes.length > 0 && <SummaryPanel/>} */}
      </div>

      <main>
        <div className="notes">
          <div className="sorting">
            <span className="sorting-option sort-button" title="Sort Notes">
              <span className="material-symbols-outlined">Sort</span>
              <Select
                defaultValue={sortOption}
                onChange={setSortOption}
                options={sortOptions}
              />
            </span>
            <span className="sorting-option sort-button" title="Filter Notes">
              <span className="material-symbols-outlined">filter_alt</span>
              <Select
                isMulti={true}
                defaultValue={filterOption}
                onChange={setFilterOption}
                options={filterOptions}
              />
            </span>
          </div>
          {filteredNotes &&
            filteredNotes.map((note) => (
              <NoteDetails key={note._id} note={note} />
            ))}
        </div>
      </main>
    </div>
  )
}
