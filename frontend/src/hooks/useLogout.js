import { useAuthContext } from "./useAuthContext"
import { useNoteContext } from "./useNoteContext"

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: noteDispatch } = useNoteContext()

  const logout = () => {
    localStorage.removeItem("user")
    dispatch({ type: "LOGOUT_USER" })
    noteDispatch({ type: "SET_NOTES", payload: null })
  }

  return { logout }
}
