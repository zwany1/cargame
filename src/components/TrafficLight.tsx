import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface TrafficLightProps {
  position: [number, number, number]
}

export function TrafficLight({ position }: TrafficLightProps) {
  const redRef = useRef<THREE.Mesh>(null)
  const yellowRef = useRef<THREE.Mesh>(null)
  const greenRef = useRef<THREE.Mesh>(null)
  const timerRef = useRef(0)

  useFrame((_, delta) => {
    timerRef.current += delta

    const cycle = timerRef.current % 12

    if (redRef.current && yellowRef.current && greenRef.current) {
      if (cycle < 5) {
        redRef.current.material.emissiveIntensity = 1
        yellowRef.current.material.emissiveIntensity = 0
        greenRef.current.material.emissiveIntensity = 0
      } else if (cycle < 6) {
        redRef.current.material.emissiveIntensity = 0
        yellowRef.current.material.emissiveIntensity = 1
        greenRef.current.material.emissiveIntensity = 0
      } else {
        redRef.current.material.emissiveIntensity = 0
        yellowRef.current.material.emissiveIntensity = 0
        greenRef.current.material.emissiveIntensity = 1
      }
    }
  })

  return (
    <group position={position}>
      <mesh position={[0, 5, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 5, 8]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

      <mesh position={[0, 7.5, 0]} castShadow>
        <boxGeometry args={[0.8, 2.5, 0.5]} />
        <meshStandardMaterial color="#222222" />
      </mesh>

      <mesh ref={redRef} position={[0, 8.3, 0.3]} castShadow>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1} />
      </mesh>

      <mesh ref={yellowRef} position={[0, 7.5, 0.3]} castShadow>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0} />
      </mesh>

      <mesh ref={greenRef} position={[0, 6.7, 0.3]} castShadow>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0} />
      </mesh>
    </group>
  )
}
