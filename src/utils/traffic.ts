import * as THREE from 'three'

export function isOnRoad(x: number, z: number): boolean {
  const gridSize = 100
  const roadWidth = 10

  const xMod = Math.abs(x % gridSize)
  const zMod = Math.abs(z % gridSize)

  const onXRoad = xMod < roadWidth / 2 || xMod > gridSize - roadWidth / 2
  const onZRoad = zMod < roadWidth / 2 || zMod > gridSize - roadWidth / 2

  return onXRoad || onZRoad
}

export function getNearestRoadPoint(x: number, z: number): [number, number] {
  const gridSize = 100

  const xGrid = Math.round(x / gridSize) * gridSize
  const zGrid = Math.round(z / gridSize) * gridSize

  const distToXRoad = Math.abs(x - xGrid)
  const distToZRoad = Math.abs(z - zGrid)

  if (distToXRoad < distToZRoad) {
    return [xGrid, z]
  } else {
    return [x, zGrid]
  }
}

export function getTrafficLightState(x: number, z: number, time: number): 'red' | 'yellow' | 'green' {
  const gridSize = 100
  const xIntersection = Math.abs(x % gridSize) < 15
  const zIntersection = Math.abs(z % gridSize) < 15

  if (!xIntersection || !zIntersection) return 'green'

  const cycle = time % 12

  if (cycle < 5) return 'red'
  if (cycle < 6) return 'yellow'
  return 'green'
}

export function checkObstacle(
  position: [number, number, number],
  direction: THREE.Vector3,
  distance: number,
  obstacles: Array<{ position: [number, number, number]; radius: number }>
): boolean {
  const checkPoint = new THREE.Vector3(
    position[0] + direction.x * distance,
    position[1],
    position[2] + direction.z * distance
  )

  for (const obs of obstacles) {
    const dx = checkPoint.x - obs.position[0]
    const dz = checkPoint.z - obs.position[2]
    const dist = Math.sqrt(dx * dx + dz * dz)

    if (dist < obs.radius + 2) {
      return true
    }
  }

  return false
}
