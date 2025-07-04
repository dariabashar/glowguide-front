import { useEffect, useState } from 'react'
import './FaceAnalyzer.css' // подключим стиль

interface FaceAnalyzerProps {
  image: File
  onAnalyzeDone: (data: FaceAnalysisResult) => void
}

export interface FaceAnalysisResult {
  faceShape: string
  skinTone: string
  keyPoints: number[][]
}

export default function FaceAnalyzer({ image, onAnalyzeDone }: FaceAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasAnalyzed, setHasAnalyzed] = useState(false)

  useEffect(() => {
    if (image && !hasAnalyzed) {
      setIsAnalyzing(true)

      setTimeout(() => {
        const mockResult: FaceAnalysisResult = {
          faceShape: 'oval',
          skinTone: 'neutral',
          keyPoints: [
            [120, 150],
            [180, 150],
            [150, 200],
            [140, 250],
          ],
        }

        onAnalyzeDone(mockResult)
        setIsAnalyzing(false)
        setHasAnalyzed(true)
      }, 1500)
    }
  }, [image, hasAnalyzed, onAnalyzeDone])

  return (
    <div className="face-analyzer-status">
      {isAnalyzing && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Analyzing face...</p>
        </div>
      )}
      {hasAnalyzed && <p>✅ Analysis complete</p>}
    </div>
  )
}

