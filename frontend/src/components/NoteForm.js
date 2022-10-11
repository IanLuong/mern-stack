import { useState } from "react"
import { useNoteContext } from "../hooks/useNoteContext"

export default function NoteForm() {
  const { dispatch } = useNoteContext()

  const [title, setTitle] = useState("")
  const [owedTo, setOwedTo] = useState("")
  const [amount, setAmount] = useState("")

  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  async function handleSubmit(e) {
    e.preventDefault()
    const note = { title, amount }
    if (owedTo) note[owedTo] = owedTo

    const response = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
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
      setEmptyFields([])
      console.log("workout added", json)
      dispatch({ type: "CREATE_NOTE", payload: json })
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Note</h3>
      <label>Note Title*: </label>
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
      <label>Amount Due*: </label>
      <input
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        className={emptyFields.includes("amount") ? "error" : ""}
      ></input>

      <button>Add Note</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
