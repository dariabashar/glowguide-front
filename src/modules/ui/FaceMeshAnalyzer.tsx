import { useRef, useEffect } from 'react'
import { FaceMesh, FACEMESH_TESSELATION } from '@mediapipe/face_mesh'
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'
import type { FaceAnalysisResult } from './FaceAnalyzer' 

interface Props {
  image: File
  onAnalyzeDone: (data: FaceAnalysisResult) => void
}

export default function FaceMeshAnalyzer({ image, onAnalyzeDone }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const runFaceMesh = async () => {
      if (!image || !canvasRef.current || !imgRef.current) return

      const faceMesh = new FaceMesh({
        locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
      })

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      })

      faceMesh.onResults(results => {
        const canvas = canvasRef.current!
        const ctx = canvas.getContext('2d')!
        canvas.width = imgRef.current!.naturalWidth
        canvas.height = imgRef.current!.naturalHeight

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(imgRef.current!, 0, 0, canvas.width, canvas.height)

        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
          for (const landmarks of results.multiFaceLandmarks) {
            drawConnectors(ctx, landmarks, FACEMESH_TESSELATION, {
              color: '#00FF00',
              lineWidth: 1,
            })
            drawLandmarks(ctx, landmarks, {
              color: '#FF0000',
              lineWidth: 1,
              radius: 1,
            })
            onAnalyzeDone({
              faceShape: 'oval',
              skinTone: 'neutral',
              keyPoints: landmarks.map(p => [p.x * canvas.width, p.y * canvas.height]),
            })
          }
        }
      })

      const reader = new FileReader()
      reader.onload = async () => {
        if (typeof reader.result === 'string') {
          const imgEl = imgRef.current!
          imgEl.src = reader.result
          imgEl.onload = async () => {
            await faceMesh.send({ image: imgEl })
          }
        }
      }

      reader.readAsDataURL(image)
    }

    runFaceMesh()
  }, [image, onAnalyzeDone])

  return (
    <div style={{ position: 'relative' }}>
      <img ref={imgRef} alt="uploaded" style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ width: '100%', borderRadius: '8px' }} />
    </div>
  )
}
