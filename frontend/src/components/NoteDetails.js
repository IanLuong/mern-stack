import { useNoteContext } from "../hooks/useNoteContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { differenceInCalendarDays, isAfter } from "date-fns"
import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

export default function NoteDetails({ note }) {
  const { dispatch } = useNoteContext()
  const { user } = useAuthContext()

  const [urgency, setUrgency] = useState("low-urgency")
  const [close, setClose] = useState("")

  useEffect(() => {
    const date = new Date(note.dateDue)
    const now = new Date()

    const difference = differenceInCalendarDays(date, now)
    const past = isAfter(now, date)

    //TODO: Refactor this
    if (past || difference === 0) {
      setUrgency("high-urgency")
    } else if (difference <= 5) {
      setUrgency("medium-urgency")
    }

    if (difference === 0) {
      setClose("Today")
    }
    if (difference === 1) {
      setClose("Tomorrow")
    }
    if (difference === -1) {
      setClose("Yesterday")
    }
  }, [note.dateDue])

  async function deleteNote() {
    const response = await fetch("/api/notes/" + note._id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: "DELETE_NOTE", payload: json })
    }
  }

  return (
    <div className="note-details">
      <h4 className="note-title">{note.title}</h4>
      {note.dateDue && (
        <h4 className={`subtitle ${urgency}`}>
          Due{" "}
          {close
            ? close
            : formatDistanceToNow(new Date(note.dateDue), { addSuffix: true })}
        </h4>
      )}
      {note.owedTo && (
        <p>
          <strong>Owed to: </strong>
          {note.owedTo}
        </p>
      )}
      <p>
        <strong>Amount owed: </strong>£{note.amount.toFixed(2)}
      </p>
      <p>
        <strong>Added: </strong>
        {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
      </p>

      <div className="options">
        {/* TODO: Add Done button handler */}
        {/* TODO: Add edit button handler */}
        <span
          className="material-symbols-outlined positive"
          title="Mark as Done"
        >
          Done
        </span>
        <span className="material-symbols-outlined neutral" title="Edit Note">
          Edit
        </span>
        <span
          onClick={deleteNote}
          className="material-symbols-outlined negative"
          title="Delete Note"
        >
          Delete
        </span>
      </div>
    </div>
  )
}
