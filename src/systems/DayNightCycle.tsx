import { useFrame } from '@react-three/fiber'
import { useTimeStore } from '@/stores/timeStore'

export function DayNightCycle() {
  const { time, dayPhase, update } = useTimeStore()

  useFrame((state, delta) => {
    update(delta)

    const sun = state.scene.children.find((c) => c.type === 'DirectionalLight')
    if (sun) {
      const angle = (time / 240) * Math.PI * 2
      sun.position.set(
        Math.cos(angle) * 300,
        Math.sin(angle) * 300 + 50,
        100
      )

      if (dayPhase === 'day') {
        sun.intensity = 1.5
      } else if (dayPhase === 'dusk') {
        sun.intensity = 0.8
      } else {
        sun.intensity = 0.3
      }
    }

    const ambientLight = state.scene.children.find((c) => c.type === 'AmbientLight')
    if (ambientLight) {
      if (dayPhase === 'day') {
        ambientLight.intensity = 0.6
      } else if (dayPhase === 'dusk') {
        ambientLight.intensity = 0.4
      } else {
        ambientLight.intensity = 0.2
      }
    }

    const bgColors = {
      day: 0x87ceeb,
      dusk: 0xff6b4a,
      night: 0x0a0a1a
    }
    state.scene.background?.set(bgColors[dayPhase])
  })

  return null
}
