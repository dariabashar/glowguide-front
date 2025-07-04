interface Props {
  style: 'day' | 'evening' | 'custom'
}

export default function MakeupVideo({ style }: Props) {
  const getVideoSrc = () => {
    if (style === 'day') return '/videos/daily.mp4'
    if (style === 'evening') return '/videos/evening-demo.mp4'
    if (style === 'custom') return '/videos/custom-demo.mp4'
    return ''
  }

  return (
    <video
      src={getVideoSrc()}
      controls
      autoPlay
      loop
      muted
      style={{
        width: '100%',
        maxWidth: '500px',
        borderRadius: '8px',
        marginTop: '10px',
      }}
    />
  )
}
