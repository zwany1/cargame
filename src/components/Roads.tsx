export function Roads() {
  return (
    <group>
      {Array.from({ length: 11 }).map((_, i) => {
        const pos = (i - 5) * 100
        return (
          <group key={i}>
            <mesh position={[pos, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[10, 1000]} />
              <meshStandardMaterial color="#5a5a5a" flatShading />
            </mesh>
            <mesh position={[0, 0.02, pos]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[1000, 10]} />
              <meshStandardMaterial color="#5a5a5a" flatShading />
            </mesh>

            <mesh position={[pos, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.3, 1000]} />
              <meshStandardMaterial color="#ffffff" flatShading />
            </mesh>
            <mesh position={[0, 0.03, pos]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[1000, 0.3]} />
              <meshStandardMaterial color="#ffffff" flatShading />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
