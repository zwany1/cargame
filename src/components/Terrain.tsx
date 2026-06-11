export function Terrain() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#7ec850" flatShading />
      </mesh>

      {Array.from({ length: 10 }).map((_, i) =>
        Array.from({ length: 10 }).map((_, j) => {
          const x = (i - 4.5) * 100
          const z = (j - 4.5) * 100
          return (
            <mesh key={`${i}-${j}`} position={[x, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[90, 90]} />
              <meshStandardMaterial color="#6db83f" flatShading />
            </mesh>
          )
        })
      )}
    </group>
  )
}
