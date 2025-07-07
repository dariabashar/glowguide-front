import axios from 'axios'

// Настройка axios-инстанса
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
export const register = async (
  email: string,
  password: string
): Promise<{ access_token: string }> => {
  const res = await API.post<{ access_token: string }>(
    '/register',
    {
      username: email,
      password: password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return res.data
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
// ✅ ВНЕ функции, отдельный экспорт
export const tryOnMakeup = async (
  formData: FormData,
  token: string
): Promise<{ video_url: string }> => {
  const res = await API.post('/try-on/', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data as { video_url: string }
}
