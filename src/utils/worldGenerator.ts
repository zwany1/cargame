import * as THREE from 'three'

export function generateTerrain(size: number, segments: number) {
  const geometry = new THREE.PlaneGeometry(size, size, segments, segments)
  const vertices = geometry.attributes.position.array

  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i]
    const y = vertices[i + 1]

    vertices[i + 2] =
      Math.sin(x * 0.02) * 8 +
      Math.cos(y * 0.02) * 8 +
      Math.sin(x * 0.005) * 20 +
      Math.cos(y * 0.005) * 20
  }

  geometry.computeVertexNormals()
  return geometry
}

export function generateRoadPath(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = []

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 50
    const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 50
    points.push(new THREE.Vector3(x, 0.5, z))
  }

  return points
}

export function scatterPoints(count: number, range: number, minDistance: number = 50) {
  const points: [number, number, number][] = []

  for (let i = 0; i < count; i++) {
    let attempts = 0
    let validPoint = false
    let x = 0, z = 0

    while (!validPoint && attempts < 50) {
      x = (Math.random() - 0.5) * range
      z = (Math.random() - 0.5) * range

      validPoint = points.every(([px, , pz]) => {
        const dist = Math.sqrt((x - px) ** 2 + (z - pz) ** 2)
        return dist >= minDistance
      })

      attempts++
    }

    if (validPoint) {
      points.push([x, 0, z])
    }
  }

  return points
}
