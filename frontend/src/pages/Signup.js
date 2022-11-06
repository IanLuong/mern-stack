import { useState } from "react"
import { useSignUp } from "../hooks/useSignup"
import { Link } from "react-router-dom"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { signup, error, isLoading } = useSignUp()

  async function handleSubmit(e) {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <img src="signup.svg" alt="" className="logo" />
      <h1 className="title">WhatDo.io</h1>
      <h3>
        Sign Up
        <Link to="/login" className="prompt">
          (or Login)
        </Link>
      </h3>
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
