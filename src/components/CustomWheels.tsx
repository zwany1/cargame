import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useVehicleStore } from '@/stores/vehicleStore'
import * as THREE from 'three'

interface CustomWheelsProps {
  positions: THREE.Vector3[]
}

export function CustomWheels({ positions }: CustomWheelsProps) {
  const wheelGroupRefs = useRef<THREE.Group[]>([])
  const steerGroupRefs = useRef<THREE.Group[]>([])
  const bodyRef = useVehicleStore((state) => state.bodyRef)
  const lastPosition = useRef(new THREE.Vector3())
  const currentSteerAngle = useRef(0)
  const keys = useRef<Record<string, boolean>>({})

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

  useEffect(() => {
    if (bodyRef?.current) {
      lastPosition.current.copy(bodyRef.current.position)
    }
  }, [bodyRef])

  useFrame((_, delta) => {
    if (!bodyRef?.current) return

    const currentPos = bodyRef.current.position.clone()
    const distance = currentPos.distanceTo(lastPosition.current)
    const speed = distance / delta

    const wheelRadius = 0.35
    const rotation = (speed / wheelRadius) * delta

    wheelGroupRefs.current.forEach((wheelGroup) => {
      if (wheelGroup) {
        wheelGroup.rotation.y += rotation
      }
    })

    // 转向逻辑
    const maxSteerAngle = Math.PI / 6 // 30°
    const steerSpeed = 3

    if (keys.current['a']) {
      currentSteerAngle.current = Math.min(
        currentSteerAngle.current + steerSpeed * delta,
        maxSteerAngle
      )
    } else if (keys.current['d']) {
      currentSteerAngle.current = Math.max(
        currentSteerAngle.current - steerSpeed * delta,
        -maxSteerAngle
      )
    } else {
      // 自动回正
      if (Math.abs(currentSteerAngle.current) > 0.01) {
        currentSteerAngle.current *= 0.9
      } else {
        currentSteerAngle.current = 0
      }
    }

    // 应用转向（只前轮 0 和 1）
    steerGroupRefs.current.forEach((steerGroup, i) => {
      if (steerGroup && i < 2) {
        steerGroup.rotation.z = currentSteerAngle.current
      }
    })

    lastPosition.current.copy(currentPos)
  })

  return (
    <group>
      {positions.map((pos, i) => (
        <group key={i} position={[pos.x, pos.y, pos.z]}>
          {/* 转向层（只前轮） */}
          <group
            ref={(el) => {
              if (el) steerGroupRefs.current[i] = el
            }}
          >
            {/* 轮胎朝向 */}
            <group rotation={[0, 0, Math.PI / 2]}>
              {/* 滚动层 */}
              <group
                ref={(el) => {
                  if (el) wheelGroupRefs.current[i] = el
                }}
              >
                <mesh castShadow>
                  <cylinderGeometry args={[0.6, 0.6, 0.4, 16]} />
                  <meshStandardMaterial color="#1a1a1a" />
                </mesh>
                {/* 胎纹 */}
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <mesh
                    key={idx}
                    position={[
                      Math.cos((idx / 6) * Math.PI * 2) * 0.73,
                      Math.sin((idx / 6) * Math.PI * 2) * 0.73,
                      0
                    ]}
                    rotation={[0, Math.PI / 2, (idx / 6) * Math.PI * 2]}
                  >
                    <boxGeometry args={[0.2, 0.15, 0.04]} />
                    <meshStandardMaterial color="#ff0000" />
                  </mesh>
                ))}
              </group>
            </group>
          </group>
        </group>
      ))}
    </group>
  )
}
