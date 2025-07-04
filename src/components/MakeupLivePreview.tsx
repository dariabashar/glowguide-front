import { useEffect } from 'react'

const appID = 2118420159
const appSign = 'd7821132ef9794e7fb995695c61b4d4409903b3e99c4303c013204a92a4f2d6a' 

const MakeupLivePreview = () => {
  useEffect(() => {
    const zg = new (window as any).ZegoExpressEngine(appID, appSign)
    zg.setDebugVerbose(true)

    zg.loginRoom(
      'room-1', 
      1,
      'YouGlowUser',
      { userName: 'User1' },
      true 
    )

    zg.startPublishingStream('streamID', {
      camera: {
        video: true,
        audio: true
      }
    })

    zg.createLocalStreamView('my-video')
  }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Live Makeup Preview</h2>
      <div id="my-video" style={{ width: '100%', height: '500px', background: '#000' }} />
    </div>
  )
}

export default MakeupLivePreview
