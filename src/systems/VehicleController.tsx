import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useVehicleStore } from '@/stores/vehicleStore'
import { getTerrainHeight } from '@/utils/terrain'
import * as THREE from 'three'

interface VehicleControllerProps {
  bodyRef: React.RefObject<THREE.Group>
}

export function VehicleController({ bodyRef }: VehicleControllerProps) {
  const keys = useRef<Record<string, boolean>>({})
  const velocity = useRef(new THREE.Vector3())
  const steering = useRef(0)
  const driftAngle = useRef(0)

  const { setSpeed, setDrifting, setNitro, setUsingNitro, nitroAmount, setBodyRef } = useVehicleStore()

  useEffect(() => {
    setBodyRef(bodyRef)
  }, [bodyRef, setBodyRef])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame((_, delta) => {
    if (!bodyRef.current) return

    const body = bodyRef.current
    let acceleration = 30
    let maxSpeed = 60
    const turnSpeed = 2.5
    const friction = 0.95
    const driftMinSpeed = 15

    const speed = velocity.current.length()
    const isDrifting = keys.current[' '] && speed > driftMinSpeed && Math.abs(steering.current) > 0.1
    const isNitro = keys.current['shift'] && nitroAmount > 0

    if (isNitro) {
      acceleration = 80
      maxSpeed = 120
      setUsingNitro(true)
      setNitro(Math.max(0, nitroAmount - delta * 20))
    } else {
      setUsingNitro(false)
      setNitro(Math.min(100, nitroAmount + delta * 5))
    }

    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(body.quaternion)

    if (keys.current['w']) {
      const boost = isDrifting ? 0.8 : 1.0
      velocity.current.add(forward.multiplyScalar(acceleration * boost * delta))
    }
    if (keys.current['s']) {
      velocity.current.add(forward.multiplyScalar(-acceleration * 0.6 * delta))
    }

    if (speed > maxSpeed) {
      velocity.current.normalize().multiplyScalar(maxSpeed)
    }

    if (speed > 0.5) {
      const maxSteer = isDrifting ? 0.7 : 0.52
      const steerSpeed = isDrifting ? 4 : 3

      if (keys.current['a']) {
        steering.current = Math.min(steering.current + delta * steerSpeed, maxSteer)
      } else if (keys.current['d']) {
        steering.current = Math.max(steering.current - delta * steerSpeed, -maxSteer)
      } else {
        steering.current *= 0.9
      }

      if (isDrifting) {
        const rearGrip = 0.3
        const frontGrip = 1.0

        driftAngle.current += steering.current * (1 - rearGrip) * 5 * delta

        body.rotation.y += steering.current * turnSpeed * frontGrip * delta
        body.rotation.z = -steering.current * 0.15

        const velocityAngle = Math.atan2(velocity.current.x, velocity.current.z)
        const carAngle = body.rotation.y
        const slipAngle = velocityAngle - carAngle

        velocity.current.x += Math.sin(slipAngle) * speed * (1 - rearGrip) * delta * 2
        velocity.current.z += Math.cos(slipAngle) * speed * (1 - rearGrip) * delta * 2

        setDrifting(true)
      } else {
        body.rotation.y += steering.current * turnSpeed * delta * (speed / maxSpeed)
        body.rotation.z *= 0.95
        driftAngle.current *= 0.9
        setDrifting(false)
      }
    } else {
      steering.current *= 0.9
      body.rotation.z *= 0.95
      setDrifting(false)
    }

    if (keys.current[' '] && !isDrifting) {
      velocity.current.multiplyScalar(0.97)
    }

    velocity.current.multiplyScalar(friction)

    body.position.add(velocity.current.clone().multiplyScalar(delta))

    const terrainHeight = getTerrainHeight(body.position.x, body.position.z)

    body.position.y = terrainHeight + 2
    body.rotation.x = 0

    setSpeed(speed)
  })

  return null
}
