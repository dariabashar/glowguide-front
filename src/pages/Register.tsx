import { useState } from 'react'
import { register } from '../services/api'
import { useNavigate } from 'react-router-dom'
import "./Register.css"

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(username, password)
      setSuccess(true)
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError('Ошибка регистрации')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h1 className="register-title">Register</h1>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="register-input" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="register-input" />
      <button type="submit" className="register-button">Register</button>
      {error && <div className="register-error">{error}</div>}
      {success && <div className="register-success">Регистрация успешна!</div>}
    </form>
  )
} 