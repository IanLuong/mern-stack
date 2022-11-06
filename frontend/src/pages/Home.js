import { useEffect } from "react"
import { useNoteContext } from "../hooks/useNoteContext"
import { useAuthContext } from "../hooks/useAuthContext"

import NoteDetails from "../components/NoteDetails"
import NoteForm from "../components/NoteForm"
import SummaryPanel from "../components/SummaryPanel"

export default function Home() {
  const { notes, dispatch } = useNoteContext()
  const { user } = useAuthContext()

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

  return (
    <div className="home">
      <div className="notes">
        {notes &&
          notes.map((note) => <NoteDetails key={note._id} note={note} />)}
      </div>
      <div className="side">
        <NoteForm />
        {notes && <SummaryPanel />}
      </div>
    </div>
  )
}
