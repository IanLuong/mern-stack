//Hooks
import { useEffect, useState } from "react"
import { useNoteContext } from "../hooks/useNoteContext"
import { useAuthContext } from "../hooks/useAuthContext"

//Components
import NoteDetails from "../components/NoteDetails"
import NoteForm from "../components/NoteForm"
import SummaryPanel from "../components/SummaryPanel"
import SortAndFilterPanel from "../components/SortAndFilterPanel"

//Utils
import { sortNotes, filterNotes } from "../utils/noteUtils"

export default function Home() {
  //Options
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

  //State
  const [sortOption, setSortOption] = useState(sortOptions[0])
  const [filterOption, setFilterOption] = useState("")
  const [filteredNotes, setFilteredNotes] = useState(null)

  const { notes, dispatch } = useNoteContext()
  const { user } = useAuthContext()

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
        {/* TODO: OH GOD please rename this */}
        <div className="notes">
          <SortAndFilterPanel
            sortOption={sortOption}
            setSortOption={setSortOption}
            sortOptions={sortOptions}
            filterOption={filterOption}
            setFilterOption={setFilterOption}
            filterOptions={filterOptions}
          />
          {filteredNotes &&
            filteredNotes.map((note) => (
              <NoteDetails key={note._id} note={note} />
            ))}
        </div>
      </main>
    </div>
  )
}
