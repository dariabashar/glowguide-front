import { useEffect, useState } from 'react'

interface Props {
  image: File
}

export default function FaceSegmentation({ image }: Props) {
  const [maskUrl, setMaskUrl] = useState<string | null>(null)

  const YOUR_TOKEN = import.meta.env.YOUR_TOKEN;

  useEffect(() => {
    if (!image) return

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1]

      console.log('📤 Отправляем изображение в Hugging Face...')

      try {
        const response = await fetch('https://api-inference.huggingface.co/models/nateraw/face-parsing', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${YOUR_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: `data:image/jpeg;base64,${base64}` }),
        })

        const contentType = response.headers.get('content-type') || ''
        console.log('📥 Ответ от модели:', contentType)

        if (contentType.includes('image')) {
          const blob = await response.blob()
          const url = URL.createObjectURL(blob)
          setMaskUrl(url)
        } else {
          const json = await response.json()
          console.warn('⚠️ Модель вернула JSON:', json)
        }
      } catch (error) {
        console.error('❌ Ошибка при запросе к Hugging Face:', error)
      }
    }

    reader.readAsDataURL(image)
  }, [image])

  return (
    <div style={{ marginTop: '20px' }}>
      {maskUrl ? (
        <>
          <img
            src={maskUrl}
            alt="Segmentation Mask"
            width={500}
            style={{
              border: '2px solid #ccc',
              borderRadius: '8px'
            }}
          />
          <a href={maskUrl} download="face_mask.png" style={{ display: 'block', marginTop: '10px' }}>
            ⬇️ Download Mask
          </a>
        </>
      ) : (
        <p>⏳ Generating segmentation...</p>
      )}
    </div>
  )
}
