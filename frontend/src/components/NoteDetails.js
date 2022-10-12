import { useNoteContext } from "../hooks/useNoteContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { differenceInCalendarDays, parseISO } from "date-fns"

export default function NoteDetails({ note }) {
  const { dispatch } = useNoteContext()

  async function handleClick() {
    const response = await fetch("/api/notes/" + note._id, {
      method: "DELETE",
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: "DELETE_NOTE", payload: json })
    }
  }

  return (
    <div className="note-details">
      <h4 className="note-title">{note.title}</h4>

      {/* TODO: Add conditional colouring when less than 5 days away*/}
      {note.dateDue && (
        <h4 className="subtitle">
          Due {formatDistanceToNow(new Date(note.dateDue), { addSuffix: true })}
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
        <span onClick={handleClick} className="material-symbols-outlined">
          Edit
        </span>
        <span onClick={handleClick} className="material-symbols-outlined">
          Delete
        </span>
      </div>
    </div>
  )
}
