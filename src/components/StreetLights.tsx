import { useMemo } from 'react'

export function StreetLights() {
  const positions = useMemo(() => {
    const lights: [number, number, number][] = []
    for (let x = -90; x <= 90; x += 30) {
      lights.push([x, 0, -20])
      lights.push([x, 0, 20])
    }
    for (let z = -90; z <= 90; z += 30) {
      lights.push([-20, 0, z])
      lights.push([20, 0, z])
    }
    return lights
  }, [])

  return (
    <group>
      {positions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh position={[0, 4, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.15, 8, 8]} />
            <meshStandardMaterial color="#555555" />
          </mesh>

          <mesh position={[0, 8.5, 0]} castShadow>
            <boxGeometry args={[0.6, 0.4, 0.6]} />
            <meshStandardMaterial color="#ffcc88" emissive="#ffaa44" emissiveIntensity={0.5} />
          </mesh>

          <pointLight position={[0, 8, 0]} intensity={0.3} distance={20} color="#ffcc88" />
        </group>
      ))}
    </group>
  )
}
