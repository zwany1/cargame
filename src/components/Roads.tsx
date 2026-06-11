export function Roads() {
  return (
    <group>
      {Array.from({ length: 11 }).map((_, i) => {
        const pos = (i - 5) * 100
        return (
          <group key={i}>
            {/* 竖向道路 */}
            <mesh position={[pos, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[10, 1000]} />
              <meshStandardMaterial color="#4a4a4a" flatShading />
            </mesh>
            {/* 竖向中心线 */}
            <mesh position={[pos, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.2, 1000]} />
              <meshStandardMaterial color="#ffeb3b" flatShading />
            </mesh>

            {/* 横向道路 */}
            <mesh position={[0, 0.02, pos]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[1000, 10]} />
              <meshStandardMaterial color="#4a4a4a" flatShading />
            </mesh>
            {/* 横向中心线 */}
            <mesh position={[0, 0.03, pos]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[1000, 0.2]} />
              <meshStandardMaterial color="#ffeb3b" flatShading />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
