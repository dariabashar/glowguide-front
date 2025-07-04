import axios from 'axios'

// Настройка axios-инстанса
const API = axios.create({
  baseURL: 'http://127.0.0.1:8000',
})

// Авторизация — получение access_token
export const login = async (username: string, password: string): Promise<{ access_token: string }> => {
  const data = new URLSearchParams()
  data.append('username', username)
  data.append('password', password)

  const res = await API.post('/token', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  return res.data as { access_token: string }
}

// Регистрация пользователя
export const register = async (username: string, password: string): Promise<{ access_token: string }> => {
  const res = await API.post('/register', {
    username,
    password,
  })

  return res.data as { access_token: string }
}

// Генерация макияжа по изображению и промпту
export const generateMakeup = async (
  image: File,
  prompt: string,
  token: string
): Promise<{
  filename: string
  saved_as: string
  face_data: any
  recommendation: string
  video_url: string
}> => {
  const formData = new FormData()
  formData.append('file', image) // <-- ключ должен быть 'file' как в FastAPI
  formData.append('prompt_text', prompt)

  const res = await API.post('/makeup-recommendation/', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data as {
    filename: string
    saved_as: string
    face_data: any
    recommendation: string
    video_url: string
  }
}
