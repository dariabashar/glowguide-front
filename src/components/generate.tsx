// upload.tsx или generate.tsx

import { useState } from 'react'

export default function GenerateMakeup() {
  const [image, setImage] = useState<File | null>(null)
  const [result, setResult] = useState<any>(null)

  const handleSubmit = async () => {
    if (!image) return
    const formData = new FormData()
    formData.append('file', image)

    const res = await fetch('http://localhost:8000/generate-makeup', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    setResult(data)
  }

  return (
    <div className="p-4">
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      <button onClick={handleSubmit}>Сгенерировать макияж</button>

      {result && (
        <div className="mt-4">
          <h2>Результат:</h2>
          <pre>{JSON.stringify(result.face_data, null, 2)}</pre>
          <h3 className="mt-2">Описание:</h3>
          <p>{result.enhanced_prompt}</p>
          <h3>Шаги:</h3>
          <ul>
            {result.steps.map((step: any, idx: number) => (
              <li key={idx}>
                <strong>{step.title}:</strong> {step.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
