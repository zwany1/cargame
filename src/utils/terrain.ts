import * as THREE from 'three'

export function getTerrainHeight(x: number, z: number): number {
  return 0
}

export function getTerrainNormal(x: number, z: number): THREE.Vector3 {
  const delta = 0.5
  const hL = getTerrainHeight(x - delta, z)
  const hR = getTerrainHeight(x + delta, z)
  const hD = getTerrainHeight(x, z - delta)
  const hU = getTerrainHeight(x, z + delta)

  const normal = new THREE.Vector3(hL - hR, 2 * delta, hD - hU)
  return normal.normalize()
}
