function StreetLamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 3, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 6, 8]} />
        <meshStandardMaterial color="#4a4a4a" flatShading />
      </mesh>

      <mesh position={[0, 6.5, 0]} castShadow>
        <sphereGeometry args={[0.6, 8, 8]} />
        <meshStandardMaterial color="#ffeb99" emissive="#ffeb99" emissiveIntensity={0.3} flatShading />
      </mesh>
    </group>
  )
}

export function Decorations() {
  const lamps: [number, number, number][] = []

  for (let i = -400; i <= 400; i += 200) {
    for (let j = -400; j <= 400; j += 200) {
      if (Math.abs(i) > 50 || Math.abs(j) > 50) {
        lamps.push([i, 0, j])
      }
    }
  }

  return (
    <group>
      {lamps.map((pos, i) => (
        <StreetLamp key={i} position={pos} />
      ))}
    </group>
  )
}
