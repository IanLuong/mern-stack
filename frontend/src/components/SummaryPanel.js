import { useEffect, useState } from "react"
import { useNoteContext } from "../hooks/useNoteContext"

export default function SummaryPanel() {
  const { notes } = useNoteContext()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(
      notes ? notes.reduce((total, note) => total + note["amount"], 0) : 0
    )
  }, [notes])

  return (
    <div className="summary">
      <h2>Total</h2>
      <span className="summary-total">£{total.toFixed(2)}</span>
    </div>
  )
}
