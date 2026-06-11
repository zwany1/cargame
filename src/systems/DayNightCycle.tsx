import { useFrame } from '@react-three/fiber'
import { useTimeStore } from '@/stores/timeStore'
import * as THREE from 'three'

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

      const sunLight = sun as THREE.DirectionalLight
      if (dayPhase === 'day') {
        sunLight.intensity = 1.5
      } else if (dayPhase === 'dusk') {
        sunLight.intensity = 0.8
      } else {
        sunLight.intensity = 0.3
      }
    }

    const ambientLight = state.scene.children.find((c) => c.type === 'AmbientLight')
    if (ambientLight) {
      const ambLight = ambientLight as THREE.AmbientLight
      if (dayPhase === 'day') {
        ambLight.intensity = 0.6
      } else if (dayPhase === 'dusk') {
        ambLight.intensity = 0.4
      } else {
        ambLight.intensity = 0.2
      }
    }

    const bgColors = {
      day: 0x87ceeb,
      dusk: 0xff6b4a,
      night: 0x0a0a1a
    }
    if (state.scene.background instanceof THREE.Color) {
      state.scene.background.set(bgColors[dayPhase])
    }
  })

  return null
}
