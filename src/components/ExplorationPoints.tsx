import { useEffect, useMemo } from 'react'
import { useVehicleStore } from '@/stores/vehicleStore'
import { useExplorationStore } from '@/stores/explorationStore'
import type { ExplorationPoint } from '@/types'

export function ExplorationPoints() {
  const bodyRef = useVehicleStore((state) => state.bodyRef)
  const { points, discoverPoint, initializePoints } = useExplorationStore()

  const initialPoints = useMemo<ExplorationPoint[]>(() => {
    const names = [
      '中央广场', '市政厅', '购物中心', '中央公园', '火车站', '图书馆',
      '博物馆', '体育馆', '大学', '医院', '警察局', '消防局',
      '电影院', '音乐厅', '美术馆', '咖啡街', '商业区', '金融中心',
      '科技园', '会展中心'
    ]

    return names.map((name, i) => {
      const angle = (i / names.length) * Math.PI * 2
      const radius = 200 + (i % 3) * 80
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius

      return {
        id: `point-${i}`,
        position: [x, 0, z] as [number, number, number],
        name,
        discovered: false,
        radius: 20
      }
    })
  }, [])

  useEffect(() => {
    initializePoints(initialPoints)
  }, [])

  useEffect(() => {
    if (!bodyRef?.current) return

    const vehicle = bodyRef.current
    const position = vehicle.position

    points.forEach((point) => {
      if (!point.discovered) {
        const dx = position.x - point.position[0]
        const dz = position.z - point.position[2]
        const distance = Math.sqrt(dx * dx + dz * dz)

        if (distance < point.radius) {
          discoverPoint(point.id)
        }
      }
    })
  }, [bodyRef, points, discoverPoint])

  return (
    <group>
      {points.map((point) => (
        <group key={point.id} position={point.position}>
          <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[3, 3, 0.5, 16]} />
            <meshStandardMaterial
              color={point.discovered ? '#00ff00' : '#ffff00'}
              emissive={point.discovered ? '#00ff00' : '#ffff00'}
              emissiveIntensity={0.6}
              transparent
              opacity={point.discovered ? 0.5 : 0.8}
            />
          </mesh>

          {!point.discovered && (
            <mesh position={[0, 8, 0]}>
              <coneGeometry args={[1, 4, 4]} />
              <meshStandardMaterial
                color="#ffff00"
                emissive="#ffff00"
                emissiveIntensity={0.8}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  )
}
