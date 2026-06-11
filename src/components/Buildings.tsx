function Church({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 6, 0]} castShadow receiveShadow>
        <boxGeometry args={[15, 12, 20]} />
        <meshStandardMaterial color="#b8b8b8" flatShading />
      </mesh>

      <mesh position={[0, 13, 0]} castShadow>
        <coneGeometry args={[9, 4, 4]} />
        <meshStandardMaterial color="#6a6a6a" flatShading />
      </mesh>

      <mesh position={[0, 19, 6]} castShadow>
        <cylinderGeometry args={[1.5, 1.5, 12, 8]} />
        <meshStandardMaterial color="#c0c0c0" flatShading />
      </mesh>

      <mesh position={[0, 26, 6]} castShadow>
        <coneGeometry args={[2, 6, 8]} />
        <meshStandardMaterial color="#888888" flatShading />
      </mesh>
    </group>
  )
}

function TownHall({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 10, 0]} castShadow receiveShadow>
        <boxGeometry args={[25, 20, 18]} />
        <meshStandardMaterial color="#d4a574" flatShading />
      </mesh>

      <mesh position={[0, 22, 0]} castShadow>
        <boxGeometry args={[26, 2, 19]} />
        <meshStandardMaterial color="#8b6f47" flatShading />
      </mesh>

      <mesh position={[0, 27, 0]} castShadow>
        <coneGeometry args={[8, 10, 4]} />
        <meshStandardMaterial color="#c85a3a" flatShading />
      </mesh>
    </group>
  )
}

function House({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 4, 0]} castShadow receiveShadow>
        <boxGeometry args={[12, 8, 12]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>

      <mesh position={[0, 9.5, 0]} castShadow>
        <coneGeometry args={[9, 4, 4]} />
        <meshStandardMaterial color="#c85a3a" flatShading />
      </mesh>
    </group>
  )
}

function Shop({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 5, 0]} castShadow>
        <boxGeometry args={[14, 10, 10]} />
        <meshStandardMaterial color="#f4e4c1" flatShading />
      </mesh>

      <mesh position={[0, 11, 0]} castShadow>
        <boxGeometry args={[15, 1, 11]} />
        <meshStandardMaterial color="#e8b86d" flatShading />
      </mesh>

      <mesh position={[0, 3, 5.5]}>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#87ceeb" flatShading />
      </mesh>
    </group>
  )
}

export function Buildings() {
  const houses = [
    { pos: [-150, 0, -150] as [number, number, number], color: '#e8d4a0' },
    { pos: [-150, 0, 150] as [number, number, number], color: '#d4b896' },
    { pos: [150, 0, -150] as [number, number, number], color: '#f4e4c1' },
    { pos: [150, 0, 150] as [number, number, number], color: '#e0c4a0' },
    { pos: [-250, 0, 0] as [number, number, number], color: '#d8c8a8' },
    { pos: [250, 0, 0] as [number, number, number], color: '#e8d8b8' }
  ]

  return (
    <group>
      <Church position={[-200, 0, -200]} />
      <TownHall position={[0, 0, 0]} />
      <Shop position={[200, 0, 200]} />
      {houses.map((h, i) => (
        <House key={i} position={h.pos} color={h.color} />
      ))}
    </group>
  )
}
