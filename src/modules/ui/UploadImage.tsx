import React, { useState, useEffect } from 'react'
import './UploadImage.css'
import { jsPDF } from 'jspdf'
import MakeupVideo from './MakeupVideo'

export default function UploadImage() {
  const [image, setImage] = useState<File | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [style, setStyle] = useState<'day' | 'evening' | 'custom'>('day')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (result) generateRecommendation(style)
  }, [style])

  const generateRecommendation = (selectedStyle: 'day' | 'evening' | 'custom') => {
    let recommendation = ''
    if (selectedStyle === 'day') {
      recommendation = 'For a natural daytime look, we recommend a light foundation, a touch of blush, and neutral eyeshadow.'
    } else if (selectedStyle === 'evening') {
      recommendation = 'For an evening look, go with full-coverage foundation, shimmer eyeshadow, and bold lips.'
    } else {
      recommendation = 'Choose a feature to highlight — eyes, lips, or cheeks — and we will customize your look.'
    }

    setResult(recommendation)
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0])
      setResult(null)
    }
  }

  const handleAnalyze = () => generateRecommendation(style)

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadPDF = () => {
    const doc = new jsPDF()
    doc.setFont('helvetica')
    doc.setFontSize(14)
    doc.text('YouGlow: Makeup Recommendation', 20, 20)

    let y = 30
    if (result) {
      doc.text(result, 20, y)
    }

    doc.save('youglow_recommendations.pdf')
  }

  return (
    <div className="upload-box">
      <h1>Makeup Recommendation</h1>
      {!image && <p>Upload your photo to receive a personalized makeup look based on your features.</p>}
      <input type="file" accept="image/*" onChange={handleUpload} />

      {image && (
        <>
          <div className="preview" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ width: 300, borderRadius: 16, border: '2px solid #f43f5e', objectFit: 'cover' }} />
          </div>

          <h3>Choose a Makeup Style</h3>
          <div className="style-buttons">
            <button onClick={() => setStyle('day')} className={style === 'day' ? 'active' : ''}>Day</button>
            <button onClick={() => setStyle('evening')} className={style === 'evening' ? 'active' : ''}>Evening</button>
            <button onClick={() => setStyle('custom')} className={style === 'custom' ? 'active' : ''}>Custom</button>
          </div>

          <button className="analyze-btn" onClick={handleAnalyze}>
            Confirm and Get Recommendation
          </button>

          {result && (
            <div className="result-box">
              <h3>Your Personalized Recommendation</h3>
              <p>{result}</p>

              {/* Заменено фото на демо-видео */}
              <MakeupVideo style={style} />

              <div className="result-controls">
                <button onClick={handleCopy}>📋 Copy</button>
                <button onClick={downloadPDF}>📄 Export to PDF</button>
              </div>

              {copied && <p className="copy-message">Copied to clipboard!</p>}
            </div>
          )}
        </>
      )}
    </div>
  )
}
