import { useMemo } from 'react'

export function Sidewalks() {
  const walks = useMemo(() => [
    { x: -100, z: 0, width: 4, length: 200, rotation: 0 },
    { x: 100, z: 0, width: 4, length: 200, rotation: 0 },
    { x: 0, z: -100, width: 4, length: 200, rotation: Math.PI / 2 },
    { x: 0, z: 100, width: 4, length: 200, rotation: Math.PI / 2 }
  ], [])

  return (
    <group>
      {walks.map((walk, i) => (
        <mesh key={i} position={[walk.x, 0.2, walk.z]} rotation={[-Math.PI / 2, 0, walk.rotation]} receiveShadow>
          <planeGeometry args={[walk.width, walk.length]} />
          <meshStandardMaterial color="#cccccc" />
        </mesh>
      ))}
    </group>
  )
}
