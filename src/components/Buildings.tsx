function Church({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 6, 0]} castShadow receiveShadow>
        <boxGeometry args={[15, 12, 20]} />
        <meshStandardMaterial color="#8b7355" flatShading />
      </mesh>

      {/* 窗户 */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={`w-${i}`} position={[-5 + i * 5, 8, 10.1]}>
          <boxGeometry args={[2, 2, 0.1]} />
          <meshStandardMaterial color="#87ceeb" flatShading />
        </mesh>
      ))}

      <mesh position={[0, 13, 0]} castShadow>
        <coneGeometry args={[9, 4, 4]} />
        <meshStandardMaterial color="#8b4513" flatShading />
      </mesh>

      <mesh position={[0, 19, 6]} castShadow>
        <cylinderGeometry args={[1.5, 1.5, 12, 8]} />
        <meshStandardMaterial color="#cd853f" flatShading />
      </mesh>

      <mesh position={[0, 26, 6]} castShadow>
        <coneGeometry args={[2, 6, 8]} />
        <meshStandardMaterial color="#6b4423" flatShading />
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

      {/* 窗户网格 */}
      {Array.from({ length: 4 }).map((_, i) =>
        Array.from({ length: 2 }).map((_, j) => (
          <mesh key={`w-${i}-${j}`} position={[-8 + i * 6, 6 + j * 8, 9.1]}>
            <boxGeometry args={[1.5, 1.5, 0.1]} />
            <meshStandardMaterial color="#87ceeb" flatShading />
          </mesh>
        ))
      )}

      <mesh position={[0, 22, 0]} castShadow>
        <boxGeometry args={[26, 2, 19]} />
        <meshStandardMaterial color="#8b6f47" flatShading />
      </mesh>

      <mesh position={[0, 27, 0]} castShadow>
        <coneGeometry args={[8, 10, 4]} />
        <meshStandardMaterial color="#cd7f32" flatShading />
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

      {/* 门 */}
      <mesh position={[0, 2, 6.1]}>
        <boxGeometry args={[2.5, 4, 0.1]} />
        <meshStandardMaterial color="#6b4423" flatShading />
      </mesh>

      {/* 窗户 */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={`w-${i}`} position={[-4 + i * 2.7, 5.5, 6.1]}>
          <boxGeometry args={[1.5, 1.5, 0.1]} />
          <meshStandardMaterial color="#87ceeb" flatShading />
        </mesh>
      ))}

      <mesh position={[0, 9.5, 0]} castShadow>
        <coneGeometry args={[9, 4, 4]} />
        <meshStandardMaterial color="#d2691e" flatShading />
      </mesh>
    </group>
  )
}

function Shop({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 5, 0]} castShadow>
        <boxGeometry args={[14, 10, 10]} />
        <meshStandardMaterial color="#f5deb3" flatShading />
      </mesh>

      {/* 店面橱窗 */}
      <mesh position={[-3, 3, 5.1]}>
        <boxGeometry args={[5, 4, 0.1]} />
        <meshStandardMaterial color="#87ceeb" flatShading />
      </mesh>
      <mesh position={[3, 3, 5.1]}>
        <boxGeometry args={[5, 4, 0.1]} />
        <meshStandardMaterial color="#87ceeb" flatShading />
      </mesh>

      <mesh position={[0, 11, 0]} castShadow>
        <boxGeometry args={[15, 1, 11]} />
        <meshStandardMaterial color="#e8b86d" flatShading />
      </mesh>
    </group>
  )
}

export function Buildings() {
  const houses = [
    { pos: [-150, 0, -150] as [number, number, number], color: '#d2b48c' },
    { pos: [-150, 0, 150] as [number, number, number], color: '#c9a87c' },
    { pos: [150, 0, -150] as [number, number, number], color: '#deb887' },
    { pos: [150, 0, 150] as [number, number, number], color: '#d4a574' },
    { pos: [-250, 0, 0] as [number, number, number], color: '#c8956f' },
    { pos: [250, 0, 0] as [number, number, number], color: '#d9a679' }
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
