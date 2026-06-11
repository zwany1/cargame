import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { getTerrainHeight } from '@/utils/terrain'
import { isOnRoad, getTrafficLightState, checkObstacle } from '@/utils/traffic'
import { useCollisionStore } from '@/stores/collisionStore'
import { useTimeStore } from '@/stores/timeStore'
import { createSedan, createSUV, createPickup, createBus } from '@/utils/carModels'

interface NPCVehicleProps {
  id: number
  color: string
  startX: number
  startZ: number
  horizontal: boolean
  type?: 'sedan' | 'suv' | 'pickup' | 'bus'
}

export function NPCVehicle({ id, color, startX, startZ, horizontal, type = 'sedan' }: NPCVehicleProps) {
  const groupRef = useRef<THREE.Group>(null)
  const positionRef = useRef({ x: startX, z: startZ })
  const speedRef = useRef(10 + Math.random() * 5)
  const stoppedRef = useRef(false)

  const { registerNPC, updateNPC, npcVehicles } = useCollisionStore()
  const time = useTimeStore((state) => state.time)

  useEffect(() => {
    registerNPC(`npc-${id}`, [startX, 0, startZ], 2.5)

    if (groupRef.current) {
      let car: THREE.Group
      switch (type) {
        case 'suv':
          car = createSUV(color)
          break
        case 'pickup':
          car = createPickup(color)
          break
        case 'bus':
          car = createBus(color)
          break
        default:
          car = createSedan(color)
      }
      groupRef.current.add(car)
    }
  }, [id, registerNPC, startX, startZ, type, color])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const direction = horizontal ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 0, 1)
    const angle = horizontal ? Math.PI / 2 : 0

    const obstacles = npcVehicles.filter((v) => v.id !== `npc-${id}`)
    const hasObstacle = checkObstacle(
      [positionRef.current.x, 1.5, positionRef.current.z],
      direction,
      6,
      obstacles
    )

    if (hasObstacle) {
      stoppedRef.current = true
    } else {
      stoppedRef.current = false
    }

    if (!stoppedRef.current) {
      const movement = speedRef.current * delta
      positionRef.current.x += direction.x * movement
      positionRef.current.z += direction.z * movement
    }

    if (Math.abs(positionRef.current.x) > 500) positionRef.current.x = -Math.sign(positionRef.current.x) * 500
    if (Math.abs(positionRef.current.z) > 500) positionRef.current.z = -Math.sign(positionRef.current.z) * 500

    const terrainHeight = getTerrainHeight(positionRef.current.x, positionRef.current.z)
    groupRef.current.position.set(positionRef.current.x, terrainHeight + 1.5, positionRef.current.z)
    groupRef.current.rotation.y = angle

    updateNPC(`npc-${id}`, [positionRef.current.x, terrainHeight + 1.5, positionRef.current.z])
  })

  return (
    <group ref={groupRef} />
  )
}
