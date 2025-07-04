import { useState } from "react"
import { login } from "../services/api"
import "./Login.css"

export default function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data: { access_token: string } = await login(username, password)
      onLogin(data.access_token)
    } catch (err) {
      setError("Ошибка авторизации")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1 className="login-title">Login</h1>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="login-input" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="login-input" />
      <button type="submit" className="login-button">Login</button>
      {error && <div className="login-error">{error}</div>}
    </form>
  )
} 