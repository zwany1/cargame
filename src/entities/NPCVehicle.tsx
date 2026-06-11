import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getTerrainHeight } from '@/utils/terrain'
import { checkObstacle } from '@/utils/traffic'
import { useCollisionStore } from '@/stores/collisionStore'
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
  const rollRef = useRef(0)

  const { registerNPC, updateNPC, npcVehicles, getCollisionInfo } = useCollisionStore()

  useEffect(() => {
    registerNPC(`npc-${id}`, [startX, 0, startZ], 2.5, speedRef.current)

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

    // 碰撞检测和物理响应
    const collision = getCollisionInfo(
      [positionRef.current.x, 1.5, positionRef.current.z],
      2.5,
      `npc-${id}`
    )

    if (collision && collision.object.speed !== undefined) {
      const otherSpeed = collision.object.speed || 0
      const speedDiff = speedRef.current - otherSpeed

      if (speedDiff > 0) {
        // 撞击其他车：减速，可能翻车
        speedRef.current *= 0.7
        rollRef.current += speedDiff * 0.02
      } else if (speedDiff < -5) {
        // 被撞击：大幅减速甚至停止
        speedRef.current = Math.max(0, speedRef.current - speedDiff * 0.3)
        rollRef.current -= Math.abs(speedDiff) * 0.015
      }

      // 碰撞时弹开
      const pushBack = new THREE.Vector3(collision.direction[0], 0, collision.direction[1]).multiplyScalar(0.5)
      positionRef.current.x -= pushBack.x
      positionRef.current.z -= pushBack.z
    }

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
    groupRef.current.rotation.z = rollRef.current
    rollRef.current *= 0.95

    updateNPC(`npc-${id}`, [positionRef.current.x, terrainHeight + 1.5, positionRef.current.z], speedRef.current)
  })

  return (
    <group ref={groupRef} />
  )
}
