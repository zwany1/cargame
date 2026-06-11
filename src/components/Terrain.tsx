import { useMemo } from 'react'
import * as THREE from 'three'

export function Terrain() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1000, 1000, 100, 100)
    const positions = geo.attributes.position.array as Float32Array

    const perlin = (x: number, y: number): number => {
      const xi = Math.floor(x) & 255
      const yi = Math.floor(y) & 255
      const xf = x - Math.floor(x)
      const u = xf * xf * (3 - 2 * xf)
      return (Math.sin(xi * 12.9898 + yi * 78.233) * 43758.5453 % 1) * (1 - u) +
             (Math.sin((xi + 1) * 12.9898 + yi * 78.233) * 43758.5453 % 1) * u
    }

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const z = positions[i + 1]
      positions[i + 2] = perlin(x / 100, z / 100) * 3 + perlin(x / 200, z / 200) * 2
    }
    geo.attributes.position.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial color="#7ec850" flatShading />
    </mesh>
  )
}
