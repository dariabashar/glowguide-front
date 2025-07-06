import { useState } from 'react';
import { generateMakeup } from '../services/api';
import { track } from '../utils/analytics';

const MakeupGenerator = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [showVideoRecommendation, setShowVideoRecommendation] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeupStyles = [
    {
      id: 'day',
      name: 'Day Makeup',
      description: 'Natural and light makeup for everyday life',
      icon: '☀️',
      color: '#FFD700',
      image: '/examples/day.jpg',
      video: '/videos/daily.mp4'
    },
    {
      id: 'evening',
      name: 'Evening Makeup',
      description: 'Bright and dramatic makeup for special occasions',
      icon: '🌙',
      color: '#9370DB',
      image: '/examples/evening.jpg',
      video: '/videos/daily.mp4'
    }
  ];

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setError(null);
      setGeneratedVideoUrl(null);
      setUploadedImage(null);
      setIsAnalyzing(false);
      setSuggestions([]);
      setSelectedStyle(null);
      setShowVideoRecommendation(false);
      setSelectedVideo(null);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        // Отправляем фото на бэкенд
        setLoadingVideo(true);
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            setError('Вы не авторизованы');
            setLoadingVideo(false);
            return;
          }

          track('Generate Makeup', 'Makeup')
          // prompt можно сделать динамическим, пока фиксируем
          const backendResult = await generateMakeup(file, 'natural glowing makeup', token);
          setGeneratedVideoUrl(backendResult.video_url);
          // Можно также обработать рекомендации, если они приходят
          if (backendResult.recommendation) {
            setSuggestions([backendResult.recommendation]);
          }
        } catch (err) {
          setError('Ошибка генерации видео');
        } finally {
          setLoadingVideo(false);
        }
      };
      reader.onerror = () => {
        setError('Ошибка чтения файла');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
    setShowVideoRecommendation(true);
    setSelectedVideo(null);
  };

  const handleVideoSelect = (videoPath: string) => {
    setSelectedVideo(videoPath);
  };

  const getVideoRecommendations = (styleId: string) => {
    if (styleId === 'day') {
      return [
        {
          title: "How to Apply Day Makeup",
          duration: "5:23",
          thumbnail: "/examples/day.jpg",
          video: "/videos/daily.mp4"
        },
        {
          title: "Natural Foundation Application",
          duration: "3:45",
          thumbnail: "/examples/day.jpg",
          video: "/videos/daily.mp4"
        },
        {
          title: "Light Eye Makeup for Day",
          duration: "4:12",
          thumbnail: "/examples/day.jpg",
          video: "/videos/daily.mp4"
        }
      ];
    } else if (styleId === 'evening') {
      return [
        {
          title: "Evening Makeup: Step-by-Step Guide",
          duration: "8:45",
          thumbnail: "/examples/evening.jpg",
          video: "/videos/daily.mp4"
        },
        {
          title: "Dramatic Eye Makeup Tutorial",
          duration: "6:30",
          thumbnail: "/examples/evening.jpg",
          video: "/videos/daily.mp4"
        },
        {
          title: "Evening Lipstick Application",
          duration: "3:20",
          thumbnail: "/examples/evening.jpg",
          video: "/videos/daily.mp4"
        }
      ];
    }
    return [];
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #fef3cd 100%)', paddingTop: 64 }}>
      <div className="section">
        <div className="text-center mb-2">
          <h1 className="hero-title" style={{ cursor: 'default' }}>
            AI Makeup Generator
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: 600, margin: '0 auto 2em auto', transition: 'color 0.3s ease' }}>
            Upload your photo and let our AI suggest the perfect makeup look tailored just for you. 
            Beauty is personal, and so are our recommendations.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch' }}>
          {/* Upload Section */}
          <div className="card" style={{ flex: 1, minWidth: 340, maxWidth: 440, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 520, justifyContent: 'stretch', padding: '40px 32px', boxSizing: 'border-box', background: 'white', borderRadius: 24, boxShadow: '0 8px 32px rgba(167,139,250,0.10)', alignItems: 'center', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
            {!uploadedImage ? (
              <div className="text-center" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
                <div style={{ fontSize: 70, margin: '0 auto 1.2em auto', marginTop: 0, transition: 'transform 0.3s ease' }}>📸</div>
                <h3 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: 12, marginTop: 0 }}>Upload Your Photo</h3>
                <div style={{ maxWidth: 360 }}>
                  <p style={{ color: '#888', marginBottom: 12, fontSize: '1.25rem', lineHeight: 1.7, transition: 'color 0.3s ease', fontWeight: 500, marginTop: 0 }}>
                    Upload your photo to receive AI-powered makeup suggestions tailored just for you.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
                    fileInput?.click();
                  }}
                  style={{
                    background: 'linear-gradient(90deg, #f472b6 0%, #a78bfa 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '18px 36px',
                    borderRadius: 999,
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    marginBottom: 10,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(167,139,250,0.10)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                  }}
                >
                  Choose Photo
                </button>
                <input
                  type="file"
                  accept="image/*"
                  id="photo-upload"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                {/* Spacer to push content up */}
                <div style={{ flex: 1 }} />
              </div>
            ) : (
              <div className="text-center" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  style={{ 
                    width: '100%', 
                    maxWidth: 340, 
                    borderRadius: 18, 
                    marginBottom: 24,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                  }}
                />
                <button
                  onClick={() => {
                    setUploadedImage(null);
                    setGeneratedVideoUrl(null);
                    setSuggestions([]);
                    setError(null);
                  }}
                  style={{
                    background: 'transparent',
                    color: '#f472b6',
                    border: '2px solid #f472b6',
                    padding: '14px 28px',
                    borderRadius: 999,
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginBottom: 10,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f472b6';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#f472b6';
                  }}
                >
                  Upload Different Photo
                </button>
                {loadingVideo && (
                  <div style={{ marginTop: 20, color: '#a78bfa', fontWeight: 600, fontSize: '1.2rem' }}>Generating video...</div>
                )}
                {error && (
                  <div style={{ marginTop: 20, color: 'red', fontWeight: 600, fontSize: '1.2rem' }}>{error}</div>
                )}
              </div>
            )}
          </div>

          {/* Right Section: Ready to Analyze or Video */}
          {uploadedImage && generatedVideoUrl && !loadingVideo && !error ? (
            <div className="card" style={{ flex: 1, minWidth: 340, maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 520, padding: '40px 32px', boxSizing: 'border-box', background: 'white', borderRadius: 24, boxShadow: '0 8px 32px rgba(167,139,250,0.10)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: 18 }}>Your generated look</h3>
              <video
                controls
                style={{
                  width: '100%',
                  maxWidth: 520,
                  borderRadius: 16,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                }}
              >
                <source src={generatedVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <div className="card" style={{ flex: 1, minWidth: 340, maxWidth: 440, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 520, justifyContent: 'stretch', padding: '40px 32px', boxSizing: 'border-box', background: 'white', borderRadius: 24, boxShadow: '0 8px 32px rgba(167,139,250,0.10)', alignItems: 'center', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
              {isAnalyzing ? (
                <div className="text-center" style={{ width: '100%' }}>
                  <div style={{ fontSize: 64, margin: '0 auto 2em auto', animation: 'spin 1.5s linear infinite', transition: 'transform 0.3s ease' }}>✨</div>
                  <p style={{ color: '#888', fontSize: '1.25rem', lineHeight: 1.7, transition: 'color 0.3s ease', fontWeight: 500 }}>
                    Our AI is analyzing your features to find the best makeup techniques and shades for you. Please wait while we prepare your personalized recommendations...
                  </p>
                </div>
              ) : suggestions.length > 0 ? (
                <div style={{ width: '100%' }}>
                  <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '1.18rem', marginBottom: 22, lineHeight: 1.6 }}>
                    Our AI analyzes your features to find the best makeup techniques and shades for you.<br />
                    Check out your personalized tips below and pick a style to get a video tutorial!
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: 22, transition: 'color 0.3s ease', letterSpacing: '-0.5px' }}>Your Analysis</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {suggestions.map((suggestion, index) => (
                      <div key={index} style={{ 
                        padding: 20, 
                        background: '#f8f9fa', 
                        borderRadius: 12, 
                        fontSize: '1.15rem',
                        color: '#666',
                        borderLeft: '3px solid #f472b6',
                        fontWeight: 600
                      }}>
                        {suggestion}
                      </div>
                    ))}
                  </div>
                  {!selectedStyle && (
                    <div style={{ marginTop: 38 }}>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 18 }}>Choose Your Style</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {makeupStyles.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => handleStyleSelect(style.id)}
                            style={{
                              width: '100%',
                              padding: 18,
                              background: 'white',
                              border: '2px solid #eee',
                              borderRadius: 12,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 20,
                              cursor: 'pointer',
                              fontSize: '1.15rem',
                              fontWeight: 700,
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#f472b6';
                              e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = '#eee';
                              e.currentTarget.style.transform = 'translateX(0)';
                            }}
                          >
                            <div style={{ fontSize: '2.2rem' }}>{style.icon}</div>
                            <div style={{ textAlign: 'left' }}>
                              <div style={{ fontWeight: 800, color: '#333', fontSize: '1.15rem' }}>{style.name}</div>
                              <div style={{ fontSize: '1.05rem', color: '#666', fontWeight: 600 }}>{style.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
                  <div style={{ fontSize: 70, margin: '0 auto 1.2em auto', marginTop: 0, transition: 'transform 0.3s ease' }}>💄</div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: 12, marginTop: 0 }}>Ready to Analyze</h3>
                  <div style={{ maxWidth: 360 }}>
                    <p style={{ color: '#888', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: 12, fontWeight: 500, marginTop: 0 }}>
                      Upload your photo to get personalized makeup tips powered by AI.<br />
                      Get instant suggestions and a video tutorial for your perfect look!
                    </p>
                    <p style={{ color: '#b39ddb', fontSize: '1.05rem', lineHeight: 1.5, fontWeight: 600, marginTop: 0 }}>
                      Fast, easy, and free.
                    </p>
                  </div>
                  {/* Spacer to push content up */}
                  <div style={{ flex: 1 }} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Video Recommendations */}
        {showVideoRecommendation && selectedStyle && (
          <div className="card" style={{ marginTop: 32 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 24, textAlign: 'center' }}>
              Video Tutorials for {makeupStyles.find(s => s.id === selectedStyle)?.name}
            </h3>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              {getVideoRecommendations(selectedStyle).map((video, index) => (
                <div
                  key={index}
                  onClick={() => handleVideoSelect(video.video)}
                  style={{
                    width: 280,
                    background: 'white',
                    borderRadius: 12,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                  }}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    style={{ width: '100%', height: 160, objectFit: 'cover' }}
                  />
                  <div style={{ padding: 16 }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>{video.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Duration: {video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Video Player */}
        {selectedVideo && (
          <div className="card" style={{ marginTop: 32, textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 16 }}>Video Tutorial</h3>
            <video
              controls
              style={{ 
                width: '100%', 
                maxWidth: 600, 
                borderRadius: 12,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}
            >
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default MakeupGenerator; 