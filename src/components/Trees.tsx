function RoundTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 4, 8]} />
        <meshStandardMaterial color="#6b4423" flatShading />
      </mesh>
      <mesh position={[0, 5, 0]} castShadow>
        <sphereGeometry args={[2.5, 8, 8]} />
        <meshStandardMaterial color="#4a7c3b" flatShading />
      </mesh>
    </group>
  )
}

function ConeTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 4, 8]} />
        <meshStandardMaterial color="#6b4423" flatShading />
      </mesh>
      <mesh position={[0, 6, 0]} castShadow>
        <coneGeometry args={[2, 8, 8]} />
        <meshStandardMaterial color="#3a6c2b" flatShading />
      </mesh>
    </group>
  )
}

function Bush({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color="#5a8c4b" flatShading />
    </mesh>
  )
}

export function Trees() {
  const roundTrees: [number, number, number][] = []
  const coneTrees: [number, number, number][] = []

  for (let i = 0; i < 360; i += 60) {
    const angle = (i * Math.PI) / 180
    const radius = 330
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    roundTrees.push([x, 0, z])
  }

  return (
    <group>
      {roundTrees.map((pos, i) => (
        <RoundTree key={`round-${i}`} position={pos} />
      ))}
    </group>
  )
}
