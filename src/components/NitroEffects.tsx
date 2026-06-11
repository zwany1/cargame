import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useVehicleStore } from '@/stores/vehicleStore'
import * as THREE from 'three'

interface NitroEffectsProps {
  bodyRef: React.RefObject<THREE.Group>
}

export function NitroEffects({ bodyRef }: NitroEffectsProps) {
  const isNitro = useVehicleStore((state) => state.isUsingNitro)
  const speed = useVehicleStore((state) => state.speed)
  const [particles, setParticles] = useState<Array<{ position: THREE.Vector3; life: number; size: number; color: string }>>([])
  const flameLength = useRef(0)
  const spawnTimer = useRef(0)
  const heatWaveScale = useRef(1)

  useFrame((_, delta) => {
    if (!bodyRef.current) return

    // 动态火焰长度（跟速度强关联）
    if (isNitro) {
      const targetLength = THREE.MathUtils.clamp(0.8 + speed * 0.03, 1, 6)
      flameLength.current += (targetLength - flameLength.current) * delta * 8
    } else {
      flameLength.current *= 0.9
    }

    // 热浪脉动
    heatWaveScale.current = 1 + Math.sin(performance.now() * 0.01) * 0.3

    // 生成尾焰粒子
    if (isNitro) {
      spawnTimer.current += delta
      if (spawnTimer.current > 0.015) {
        spawnTimer.current = 0

        const backward = new THREE.Vector3(0, 0, 1).applyQuaternion(bodyRef.current.quaternion)
        const newParticles: Array<{ position: THREE.Vector3; life: number; size: number; color: string }> = []

        // 左侧排气管粒子
        for (let i = 0; i < 4; i++) {
          const leftPos = new THREE.Vector3(-3.2, 0.3, 5)
          bodyRef.current.localToWorld(leftPos)
          leftPos.add(backward.clone().multiplyScalar(Math.random() * 0.5))
          newParticles.push({
            position: leftPos,
            life: 0.6,
            size: 0.5 + Math.random() * 0.4,
            color: i < 2 ? '#88ffff' : '#00aaff'
          })
        }

        // 右侧排气管粒子
        for (let i = 0; i < 4; i++) {
          const rightPos = new THREE.Vector3(-0.8, 0.3, 5)
          bodyRef.current.localToWorld(rightPos)
          rightPos.add(backward.clone().multiplyScalar(Math.random() * 0.5))
          newParticles.push({
            position: rightPos,
            life: 0.6,
            size: 0.5 + Math.random() * 0.4,
            color: i < 2 ? '#88ffff' : '#00aaff'
          })
        }

        // 黄色火花
        if (Math.random() < 0.3) {
          const sparkPos1 = new THREE.Vector3(-3.2, 0.3, 5)
          bodyRef.current.localToWorld(sparkPos1)
          newParticles.push({
            position: sparkPos1,
            life: 0.3,
            size: 0.2,
            color: '#ffffaa'
          })

          const sparkPos2 = new THREE.Vector3(-0.8, 0.3, 5)
          bodyRef.current.localToWorld(sparkPos2)
          newParticles.push({
            position: sparkPos2,
            life: 0.3,
            size: 0.2,
            color: '#ffffaa'
          })
        }

        setParticles((prev) => [...prev, ...newParticles].slice(-200))
      }
    }

    // 更新粒子（沿车辆反方向喷射）
    if (bodyRef.current) {
      const backward = new THREE.Vector3(0, 0, 1).applyQuaternion(bodyRef.current.quaternion)
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            position: p.position
              .clone()
              .add(backward.multiplyScalar(delta * 20))
              .add(
                new THREE.Vector3(
                  (Math.random() - 0.5) * 0.1,
                  (Math.random() - 0.5) * 0.1,
                  0
                )
              ),
            life: p.life - delta * 2.5
          }))
          .filter((p) => p.life > 0)
      )
    }
  })

  const flicker = 1 + Math.sin(performance.now() * 0.04) * 0.2 + (Math.random() - 0.5) * 0.15

  return (
    <group>
      {/* 左侧火焰 */}
      {isNitro && (
        <group position={[-3.2, 0.3, 5]}>
          {/* 白色核心锥形 */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, flameLength.current * flicker * 0.5]}>
            <coneGeometry args={[0.15, flameLength.current * flicker * 1.0, 8]} />
            <meshBasicMaterial color="#ffffff" blending={THREE.AdditiveBlending} transparent opacity={1.0} depthWrite={false} />
          </mesh>
          {/* 内层青蓝 */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, flameLength.current * flicker * 0.65]}>
            <coneGeometry args={[0.25, flameLength.current * flicker * 1.3, 8]} />
            <meshBasicMaterial color="#88ffff" blending={THREE.AdditiveBlending} transparent opacity={0.8} depthWrite={false} />
          </mesh>
          {/* 中层亮蓝 */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, flameLength.current * flicker * 0.75]}>
            <coneGeometry args={[0.35, flameLength.current * flicker * 1.5, 8]} />
            <meshBasicMaterial color="#00aaff" blending={THREE.AdditiveBlending} transparent opacity={0.5} depthWrite={false} />
          </mesh>
          {/* 外层深蓝 */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, flameLength.current * flicker * 0.85]}>
            <coneGeometry args={[0.45, flameLength.current * flicker * 1.7, 8]} />
            <meshBasicMaterial color="#0066ff" blending={THREE.AdditiveBlending} transparent opacity={0.15} depthWrite={false} />
          </mesh>
          {/* 热浪球 */}
          <mesh scale={heatWaveScale.current}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshBasicMaterial color="#66ccff" transparent opacity={0.08} depthWrite={false} />
          </mesh>
        </group>
      )}

      {/* 右侧火焰 */}
      {isNitro && (
        <group position={[-0.8, 0.3, 5]}>
          {/* 白色核心锥形 */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, flameLength.current * flicker * 0.5]}>
            <coneGeometry args={[0.15, flameLength.current * flicker * 1.0, 8]} />
            <meshBasicMaterial color="#ffffff" blending={THREE.AdditiveBlending} transparent opacity={1.0} depthWrite={false} />
          </mesh>
          {/* 内层青蓝 */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, flameLength.current * flicker * 0.65]}>
            <coneGeometry args={[0.25, flameLength.current * flicker * 1.3, 8]} />
            <meshBasicMaterial color="#88ffff" blending={THREE.AdditiveBlending} transparent opacity={0.8} depthWrite={false} />
          </mesh>
          {/* 中层亮蓝 */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, flameLength.current * flicker * 0.75]}>
            <coneGeometry args={[0.35, flameLength.current * flicker * 1.5, 8]} />
            <meshBasicMaterial color="#00aaff" blending={THREE.AdditiveBlending} transparent opacity={0.5} depthWrite={false} />
          </mesh>
          {/* 外层深蓝 */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, flameLength.current * flicker * 0.85]}>
            <coneGeometry args={[0.45, flameLength.current * flicker * 1.7, 8]} />
            <meshBasicMaterial color="#0066ff" blending={THREE.AdditiveBlending} transparent opacity={0.15} depthWrite={false} />
          </mesh>
          {/* 热浪球 */}
          <mesh scale={heatWaveScale.current}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshBasicMaterial color="#66ccff" transparent opacity={0.08} depthWrite={false} />
          </mesh>
        </group>
      )}

      {/* 环境光晕 */}
      {isNitro && (
        <>
          <pointLight position={[-3.2, 0.3, 5]} color="#00aaff" intensity={4 + Math.random() * 2} distance={6} />
          <pointLight position={[-0.8, 0.3, 5]} color="#00aaff" intensity={4 + Math.random() * 2} distance={6} />
        </>
      )}

      {/* 尾焰粒子 */}
      {particles.map((p, i) => (
        <sprite key={i} position={p.position} scale={[p.size * p.life, p.size * p.life, 1]}>
          <spriteMaterial color={p.color} blending={THREE.AdditiveBlending} transparent opacity={p.life * 0.9} depthWrite={false} />
        </sprite>
      ))}
    </group>
  )
}
