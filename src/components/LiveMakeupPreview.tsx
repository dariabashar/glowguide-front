import React, { useRef, useEffect, useState, useCallback } from 'react';
import { FaceMesh, FACEMESH_LIPS, FACEMESH_LEFT_EYE, FACEMESH_RIGHT_EYE } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';

// Типы для стилей макияжа
const MAKEUP_STYLES = [
  {
    id: 'natural',
    name: 'Natural',
    lips: 'rgba(255, 120, 150, 0.35)',
    eyeshadow: 'rgba(180, 140, 255, 0.18)',
    blush: 'rgba(255, 180, 200, 0.18)',
  },
  {
    id: 'evening',
    name: 'Evening',
    lips: 'rgba(180, 30, 80, 0.55)',
    eyeshadow: 'rgba(80, 30, 120, 0.28)',
    blush: 'rgba(255, 120, 180, 0.22)',
  },
  {
    id: 'bold',
    name: 'Bold',
    lips: 'rgba(220, 0, 60, 0.7)',
    eyeshadow: 'rgba(120, 0, 180, 0.35)',
    blush: 'rgba(255, 80, 120, 0.28)',
  },
] as const;

type MakeupStyleId = typeof MAKEUP_STYLES[number]['id'];

const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 480;

function getStyleById(id: MakeupStyleId) {
  return MAKEUP_STYLES.find(s => s.id === id) || MAKEUP_STYLES[0];
}

// MediaPipe индексы для губ, глаз, скул
// https://github.com/tensorflow/tfjs-models/blob/master/face-landmarks-detection/mesh_map.jpg
const LIPS_INDEXES = [
  ...FACEMESH_LIPS.flat()
];
const LEFT_EYE_INDEXES = [
  ...FACEMESH_LEFT_EYE.flat()
];
const RIGHT_EYE_INDEXES = [
  ...FACEMESH_RIGHT_EYE.flat()
];
// Для скул MediaPipe не даёт готовых индексов, поэтому используем примерные области:
const LEFT_CHEEK_INDEXES = [234, 93, 132, 58, 172, 136, 150, 149, 176]; // TODO: подобрать лучше
const RIGHT_CHEEK_INDEXES = [454, 323, 361, 288, 397, 365, 379, 378, 400]; // TODO: подобрать лучше

const LiveMakeupPreview: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedStyle, setSelectedStyle] = useState<MakeupStyleId>('natural');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    let camera: Camera | null = null;
    let faceMesh: FaceMesh | null = null;
    let stopped = false;

    const setup = async () => {
      if (!videoRef.current) return;
      try {
        faceMesh = new FaceMesh({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
        });
        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });
        faceMesh.onResults(onResults);

        camera = new Camera(videoRef.current, {
          onFrame: async () => {
            if (faceMesh && !stopped) {
              await faceMesh.send({ image: videoRef.current! });
            }
          },
          width: VIDEO_WIDTH,
          height: VIDEO_HEIGHT,
        });
        camera.start();
        setIsCameraReady(true);
      } catch (err) {
        setCameraError('Не удалось получить доступ к камере или инициализировать FaceMesh.');
      }
    };
    setup();
    return () => {
      stopped = true;
      camera?.stop();
      faceMesh?.close();
    };
    // eslint-disable-next-line
  }, []);

  const onResults = useCallback((results: any) => {
    if (!canvasRef.current || !videoRef.current) return;
    const ctx = canvasRef.current.getContext('2d')!;
    ctx.clearRect(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
    ctx.drawImage(videoRef.current, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      const landmarks = results.multiFaceLandmarks[0];
      const style = getStyleById(selectedStyle);
      drawLips(ctx, landmarks, style.lips);
      drawEyeshadow(ctx, landmarks, style.eyeshadow);
      drawBlush(ctx, landmarks, style.blush);
    }
  }, [selectedStyle]);

  function drawLips(ctx: CanvasRenderingContext2D, landmarks: any[], color: string) {
    const points = LIPS_INDEXES.map(i => toCanvasXY(landmarks[i]));
    ctx.save();
    ctx.beginPath();
    points.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt[0], pt[1]);
      else ctx.lineTo(pt[0], pt[1]);
    });
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = 1;
    ctx.filter = 'blur(0.5px)';
    ctx.fill();
    ctx.restore();
  }

  function drawEyeshadow(ctx: CanvasRenderingContext2D, landmarks: any[], color: string) {
    const leftEye = LEFT_EYE_INDEXES.map(i => toCanvasXY(landmarks[i]));
    ctx.save();
    ctx.beginPath();
    leftEye.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt[0], pt[1]);
      else ctx.lineTo(pt[0], pt[1]);
    });
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = 1;
    ctx.filter = 'blur(2px)';
    ctx.fill();
    ctx.restore();
    const rightEye = RIGHT_EYE_INDEXES.map(i => toCanvasXY(landmarks[i]));
    ctx.save();
    ctx.beginPath();
    rightEye.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt[0], pt[1]);
      else ctx.lineTo(pt[0], pt[1]);
    });
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = 1;
    ctx.filter = 'blur(2px)';
    ctx.fill();
    ctx.restore();
  }

  function drawBlush(ctx: CanvasRenderingContext2D, landmarks: any[], color: string) {
    const leftCheek = LEFT_CHEEK_INDEXES.map(i => toCanvasXY(landmarks[i]));
    ctx.save();
    ctx.beginPath();
    leftCheek.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt[0], pt[1]);
      else ctx.lineTo(pt[0], pt[1]);
    });
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = 1;
    ctx.filter = 'blur(8px)';
    ctx.fill();
    ctx.restore();
    const rightCheek = RIGHT_CHEEK_INDEXES.map(i => toCanvasXY(landmarks[i]));
    ctx.save();
    ctx.beginPath();
    rightCheek.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt[0], pt[1]);
      else ctx.lineTo(pt[0], pt[1]);
    });
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = 1;
    ctx.filter = 'blur(8px)';
    ctx.fill();
    ctx.restore();
  }

  function toCanvasXY(point: { x: number; y: number }) {
    return [point.x * VIDEO_WIDTH, point.y * VIDEO_HEIGHT] as [number, number];
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <h2 style={{ fontWeight: 700, fontSize: '1.5rem', margin: '1rem 0' }}>Live Makeup Preview</h2>
      <div style={{ position: 'relative', width: VIDEO_WIDTH, height: VIDEO_HEIGHT, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 32px rgba(167,139,250,0.10)' }}>
        <video
          ref={videoRef}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          style={{ position: 'absolute', top: 0, left: 0, width: VIDEO_WIDTH, height: VIDEO_HEIGHT, objectFit: 'cover', borderRadius: 16, zIndex: 1, visibility: 'hidden' }}
          playsInline
          muted
          autoPlay
        />
        <canvas
          ref={canvasRef}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          style={{ position: 'absolute', top: 0, left: 0, width: VIDEO_WIDTH, height: VIDEO_HEIGHT, borderRadius: 16, zIndex: 2 }}
        />
        {!isCameraReady && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.7)', zIndex: 3 }}>
            <span style={{ color: '#a78bfa', fontWeight: 600, fontSize: 22 }}>Загрузка камеры...</span>
          </div>
        )}
        {cameraError && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.9)', zIndex: 4 }}>
            <span style={{ color: '#ef4444', fontWeight: 600, fontSize: 18 }}>{cameraError}</span>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
        {MAKEUP_STYLES.map(style => (
          <button
            key={style.id}
            onClick={() => setSelectedStyle(style.id)}
            style={{
              padding: '12px 28px',
              borderRadius: 999,
              border: selectedStyle === style.id ? '2px solid #a78bfa' : '2px solid #eee',
              background: selectedStyle === style.id ? '#f3e8ff' : '#fff',
              color: '#a855f7',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: selectedStyle === style.id ? '0 4px 16px rgba(167,139,250,0.10)' : '0 2px 8px rgba(0,0,0,0.05)',
              transition: 'all 0.2s',
            }}
          >
            {style.name}
          </button>
        ))}
      </div>
      <div style={{ color: '#888', fontSize: 14, marginTop: 8 }}>
        Выберите стиль макияжа и смотрите результат в реальном времени!
      </div>
    </div>
  );
};

export default LiveMakeupPreview;