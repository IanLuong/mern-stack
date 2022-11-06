import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login, error, isLoading } = useLogin()

  async function handleSubmit(e) {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <img src="piggy_bank.svg" alt="" className="logo" />
      <h1 className="title">WhatDo.io</h1>
      <div>
        <h3>Log In</h3>
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
        <button disabled={isLoading}>Login</button>
        {error && <div className="error">{error}</div>}
        <p>
          Don't have an account?
          <Link to="/signup" className="prompt">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  )
}
