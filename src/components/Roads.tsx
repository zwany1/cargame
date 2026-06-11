import { useMemo } from 'react'
import * as THREE from 'three'

export function Roads() {
  const roadMesh = useMemo(() => {
    const group = new THREE.Group()

    const roadPositions: [number, number, number, number][] = []
    for (let i = 0; i < 11; i++) {
      const pos = (i - 5) * 100
      roadPositions.push([pos, 0, 1000, 10])
      roadPositions.push([0, pos, 1000, 10])
    }

    roadPositions.forEach(([x, z, length, width]) => {
      const geo = new THREE.PlaneGeometry(width, length)
      const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: '#5a5a5a' }))
      mesh.position.set(x, 0.02, z)
      mesh.rotation.x = -Math.PI / 2
      group.add(mesh)

      const lineGeo = new THREE.PlaneGeometry(0.3, length)
      const lineMesh = new THREE.Mesh(lineGeo, new THREE.MeshStandardMaterial({ color: '#ffffff' }))
      lineMesh.position.set(x, 0.03, z)
      lineMesh.rotation.x = -Math.PI / 2
      group.add(lineMesh)
    })

    return group
  }, [])

  return <primitive object={roadMesh} attach="children" />
}
