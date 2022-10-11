import { useNoteContext } from "../hooks/useNoteContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

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
      <h4>{note.title}</h4>
      {note.owedTo && (
        <p>
          <strong>Owed to: </strong>
          {note.owedTo}
        </p>
      )}
      <p>
        <strong>Amount owed: </strong>£{note.amount}
      </p>
      {note.dateDue && (
        <p>
          <strong>Due: </strong>
          {formatDistanceToNow(new Date(note.dateDue), { addSuffix: true })}
        </p>
      )}
      <p>
        <strong>Added: </strong>
        {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
      </p>

      <span onClick={handleClick} className="material-symbols-outlined">
        Delete
      </span>
    </div>
  )
}
