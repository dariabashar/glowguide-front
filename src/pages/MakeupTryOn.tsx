import { useState } from 'react'
import { generateMakeup } from '../services/api'
import LiveMakeupPreview from '../components/LiveMakeupPreview'

function PhotoMakeup({ image }: { image: File }) {
  const [imgUrl, setImgUrl] = useState<string>("")
  const imgRef = useState<HTMLImageElement | null>(null)[0]

  if (!imgUrl && image) {
    const url = URL.createObjectURL(image)
    setImgUrl(url)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <img
        ref={imgRef as any}
        src={imgUrl}
        alt="Загруженное фото"
        style={{
          maxWidth: 350,
          borderRadius: 12,
          border: '2px solid #f43f5e',
          marginBottom: 16,
        }}
      />
    </div>
  )
}

export default function MakeupTryOn() {
  const [image, setImage] = useState<File | null>(null)
  const [reference, setReference] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!image) return
    const token = localStorage.getItem("token")
    if (!token) {
      setError("Вы не авторизованы")
      return
    }

    setLoading(true)
    setError(null)
    try {
      const prompt = "natural glowing makeup"
      const result = await generateMakeup(image, prompt, token)
      setVideoUrl(result.video_url)
    } catch (err) {
      console.error(err)
      setError("Ошибка генерации видео")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>📷 Примерка макияжа</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
        <div>
          <label style={{ fontWeight: 500 }}>Ваше фото или камера:</label><br />
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0])
              }
            }}
            style={{ marginRight: 8 }}
          />
          {image && (
            <button
              onClick={() => setImage(null)}
              style={{
                background: '#f43f5e',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                marginLeft: 8,
              }}
            >
              Убрать фото
            </button>
          )}
        </div>

        <div>
          <label style={{ fontWeight: 500 }}>Фото макияжа-референса:</label><br />
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                setReference(e.target.files[0])
              }
            }}
            style={{ marginRight: 8 }}
          />
          {reference && (
            <button
              onClick={() => setReference(null)}
              style={{
                background: '#f43f5e',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                marginLeft: 8,
              }}
            >
              Убрать референс
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 500, marginBottom: 8 }}>Вы</div>
          {image ? <PhotoMakeup image={image} /> : <LiveMakeupPreview />}
        </div>

        {reference && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 500, marginBottom: 8 }}>Референс</div>
            <PhotoMakeup image={reference} />
          </div>
        )}
      </div>

      {image && (
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            {loading ? "Генерация..." : "Сгенерировать макияж-видео"}
          </button>

          {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
        </div>
      )}

      {videoUrl && (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <h2>✨ Ваш образ:</h2>
          <video controls style={{ maxWidth: 500, borderRadius: 12, marginTop: 12 }}>
            <source src={videoUrl} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        </div>
      )}
    </div>
  )
}

