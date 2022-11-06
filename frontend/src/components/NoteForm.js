import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNoteContext } from "../hooks/useNoteContext"

export default function NoteForm() {
  const { dispatch } = useNoteContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState("")
  const [owedTo, setOwedTo] = useState("")
  const [amount, setAmount] = useState("")
  const [dateDue, setDateDue] = useState("")

  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  async function handleSubmit(e) {
    e.preventDefault()

    if (!user) {
      setError("You must be logged in")
      return
    }

    const note = { title, owedTo, amount, dateDue }

    const response = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setTitle("")
      setOwedTo("")
      setAmount("")
      setDateDue("")
      setEmptyFields([])
      console.log("workout added", json)
      dispatch({ type: "CREATE_NOTE", payload: json })
    }
  }

  return (
    <form className="create boxed" onSubmit={handleSubmit}>
      <h2>Add a new Note</h2>
      <label>
        Note Title:<span className="required">*</span>
      </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      ></input>
      <label>Owed to: </label>
      <input
        type="text"
        onChange={(e) => setOwedTo(e.target.value)}
        value={owedTo}
      ></input>
      <label>
        Amount Due:<span className="required">*</span>
      </label>
      <input
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        className={emptyFields.includes("amount") ? "error" : ""}
      ></input>
      <label>Date Due:</label>
      <input
        type="date"
        onChange={(e) => setDateDue(e.target.value)}
        value={dateDue}
      ></input>

      <button className="button-full">Add Note</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
