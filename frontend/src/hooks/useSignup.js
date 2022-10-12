import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignUp = () => {
  const { dispatch } = useAuthContext()

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch("api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      //save user to localstorage
      localStorage.setItem("user", JSON.stringify(json))

      //update auth context
      dispatch({ type: "LOGIN_USER", payload: json })

      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}
