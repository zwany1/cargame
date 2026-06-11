import { useVehicleStore } from '@/stores/vehicleStore'
import { useExplorationStore } from '@/stores/explorationStore'
import { useTimeStore } from '@/stores/timeStore'
import { useState, useEffect } from 'react'

export function HUD() {
  const speed = useVehicleStore((state) => state.speed)
  const isDrifting = useVehicleStore((state) => state.isDrifting)
  const nitroAmount = useVehicleStore((state) => state.nitroAmount)
  const isUsingNitro = useVehicleStore((state) => state.isUsingNitro)
  const { exploredPercentage } = useExplorationStore()
  const dayPhase = useTimeStore((state) => state.dayPhase)
  const [fps, setFps] = useState(60)

  useEffect(() => {
    let lastTime = performance.now()
    let frames = 0

    const updateFps = () => {
      frames++
      const currentTime = performance.now()

      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (currentTime - lastTime)))
        frames = 0
        lastTime = currentTime
      }

      requestAnimationFrame(updateFps)
    }

    const handle = requestAnimationFrame(updateFps)
    return () => cancelAnimationFrame(handle)
  }, [])

  const phaseNames = {
    day: '白天',
    dusk: '黄昏',
    night: '夜晚'
  }

  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
      fontSize: 16,
      userSelect: 'none'
    }}>
      <div style={{ marginBottom: 8 }}>
        速度: <span style={{
          fontWeight: 'bold',
          fontSize: 24,
          color: isUsingNitro ? '#00ffff' : 'white'
        }}>
          {Math.round(speed * 3.6)}
        </span> km/h
        {isDrifting && <span style={{ color: '#ff6b00', marginLeft: 10 }}>⚡ 漂移</span>}
        {isUsingNitro && <span style={{ color: '#00ffff', marginLeft: 10 }}>🚀 氮气</span>}
      </div>

      <div style={{ marginBottom: 8 }}>
        氮气:
        <div style={{
          display: 'inline-block',
          width: 150,
          height: 12,
          backgroundColor: 'rgba(0,0,0,0.5)',
          border: '1px solid white',
          marginLeft: 10,
          verticalAlign: 'middle'
        }}>
          <div style={{
            width: `${nitroAmount}%`,
            height: '100%',
            backgroundColor: nitroAmount > 30 ? '#00ffff' : '#ff4444',
            transition: 'width 0.1s'
          }} />
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        探索进度: {exploredPercentage}%
      </div>
      <div style={{ marginBottom: 8 }}>
        时间: {phaseNames[dayPhase]}
      </div>
      <div style={{ opacity: 0.7 }}>
        FPS: {fps}
      </div>
    </div>
  )
}
