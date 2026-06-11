import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  life: number
}

interface DriftSmokeProps {
  bodyRef: React.RefObject<THREE.Group>
  wheelPositions: THREE.Vector3[]
  isDrifting: boolean
}

export function DriftSmoke({ bodyRef, wheelPositions, isDrifting }: DriftSmokeProps) {
  const particles = useRef<Particle[]>([])
  const spawnTimer = useRef(0)

  useFrame((_, delta) => {
    if (!bodyRef.current) return

    // 生成新粒子
    if (isDrifting && wheelPositions.length === 4) {
      spawnTimer.current += delta

      if (spawnTimer.current > 0.05) {
        spawnTimer.current = 0

        // 后轮位置（索引 2 和 3）
        const rearIndices = [2, 3]
        rearIndices.forEach((wheelIndex: number) => {
          const worldPos = wheelPositions[wheelIndex].clone()
          bodyRef.current!.localToWorld(worldPos)

          particles.current.push({
            position: worldPos.clone(),
            velocity: new THREE.Vector3(
              (Math.random() - 0.5) * 2,
              Math.random() * 3 + 1,
              (Math.random() - 0.5) * 2
            ),
            life: 1
          })
        })
      }
    }

    // 更新粒子
    particles.current = particles.current.filter((p) => {
      p.position.add(p.velocity.clone().multiplyScalar(delta))
      p.velocity.multiplyScalar(0.95)
      p.life -= delta
      return p.life > 0
    })

    // 限制粒子数量
    if (particles.current.length > 200) {
      particles.current = particles.current.slice(-200)
    }
  })

  return (
    <group>
      {particles.current.map((p, i) => (
        <sprite key={i} position={p.position}>
          <spriteMaterial
            color="#ffffff"
            transparent
            opacity={p.life * 0.5}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  )
}
