import { useState } from 'react'
import './TryOn.css'

export default function TryOn() {
  const [userPhoto, setUserPhoto] = useState<File | null>(null)
  const [makeupRef, setMakeupRef] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!userPhoto || !makeupRef) return
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('user_photo', userPhoto)
      formData.append('makeup_reference', makeupRef)

      const res = await fetch('http://localhost:8000/try-on', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Server error')

      const data = await res.json()
      setVideoUrl(data.video_url)
    } catch (err) {
      console.error('Generation error:', err)
      setError('Could not generate video. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="tryon-root">
      <div className="tryon-bubbles">
        <div className="tryon-bubble b1"></div>
        <div className="tryon-bubble b2"></div>
        <div className="tryon-bubble b3"></div>
        <div className="tryon-bubble b4"></div>
        <div className="tryon-bubble b5"></div>
        <div className="tryon-bubble b6"></div>
        <div className="tryon-bubble b7"></div>
      </div>
      <div className="tryon-sparkles" aria-hidden="true"></div>
      <section className="tryon-hero">
        <h1 className="tryon-title-glow">GlowGuide Try-On</h1>
        <p className="tryon-subtitle">Experience AI-powered virtual makeup magic. Upload your photo, choose a makeup look, and see yourself transformed in seconds.</p>
      </section>
      <div className="tryon-upload-row">
        <div className="tryon-card glass">
          <label className="tryon-label" htmlFor="user-photo">Your Photo</label><br />
          <input id="user-photo" aria-label="Upload your photo" type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files?.[0]
            if (file && file.type.startsWith('image/')) setUserPhoto(file)
          }} />
          {userPhoto && (
            <img
              src={URL.createObjectURL(userPhoto)}
              alt="User preview"
              className="tryon-img"
            />
          )}
        </div>
        <div className="tryon-card glass">
          <label className="tryon-label" htmlFor="makeup-ref">Makeup Reference</label><br />
          <input id="makeup-ref" aria-label="Upload makeup reference" type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files?.[0]
            if (file && file.type.startsWith('image/')) setMakeupRef(file)
          }} />
          {makeupRef && (
            <img
              src={URL.createObjectURL(makeupRef)}
              alt="Makeup reference preview"
              className="tryon-img"
            />
          )}
        </div>
      </div>
      <button
        onClick={handleGenerate}
        disabled={!userPhoto || !makeupRef || loading}
        className="tryon-btn tryon-btn-glow"
        aria-label="Generate makeup video"
      >
        {loading ? <span className="tryon-spinner"></span> : 'Generate Makeup Video'}
      </button>
      {loading && <div className="tryon-progress"><span className="tryon-loading">Generating your look...</span></div>}
      {error && <p className="tryon-error">{error}</p>}
      {videoUrl && (
        <div className="tryon-result tryon-result-glow">
          <h3 className="tryon-result-title">✨ Your Glow Look</h3>
          <video controls className="tryon-video">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button className="tryon-btn tryon-btn-share" aria-label="Share your look">Share</button>
        </div>
      )}
    </div>
  )
}
