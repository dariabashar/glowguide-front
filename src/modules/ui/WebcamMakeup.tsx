import { useRef, useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { FaceMesh } from '@mediapipe/face_mesh'
import { Camera } from '@mediapipe/camera_utils'

export default function WebcamMakeup() {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCameraOn, setIsCameraOn] = useState(true)

  useEffect(() => {
    if (!isCameraOn) return

    const faceMesh = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    })

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    })

    faceMesh.onResults(onResults)

    if (webcamRef.current?.video) {
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current!.video! })
        },
        width: 640,
        height: 480
      })
      camera.start()
    }
  }, [isCameraOn])

  const onResults = (results: any) => {
    if (!canvasRef.current || !results.multiFaceLandmarks) return

    const canvasCtx = canvasRef.current.getContext('2d')
    const video = webcamRef.current?.video
    if (!video || !canvasCtx || !canvasRef.current) return

    canvasCtx.save()
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    canvasCtx.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height)

    canvasCtx.restore()
  }

  return (
    <div style={{ position: 'relative', width: 640, height: 480 }}>
      <button
        onClick={() => setIsCameraOn(!isCameraOn)}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 10,
          background: isCameraOn ? '#f43f5e' : '#16a34a',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}
      >
        {isCameraOn ? '📷 Выключить камеру' : '📷 Включить камеру'}
      </button>
      
      {isCameraOn ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            style={{ position: 'absolute', width: 640, height: 480, visibility: 'hidden' }}
          />
          <canvas
            ref={canvasRef}
            width={640}
            height={480}
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </>
      ) : (
        <div style={{
          width: 640,
          height: 480,
          background: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          border: '2px dashed #d1d5db'
        }}>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Камера выключена</p>
        </div>
      )}
    </div>
  )
}
