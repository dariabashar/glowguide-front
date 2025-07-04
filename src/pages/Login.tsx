import Login from '../components/Login'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()

  const handleLogin = (token: string) => {
    localStorage.setItem('token', token)
    navigate('/home')
  }

  return <Login onLogin={handleLogin} />
} 