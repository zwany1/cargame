import * as THREE from 'three'

export function createSedan(color: string = '#ff4444') {
  const group = new THREE.Group()

  const bodyGeo = new THREE.BoxGeometry(2, 1, 4)
  const bodyMat = new THREE.MeshStandardMaterial({ color, flatShading: true })
  const body = new THREE.Mesh(bodyGeo, bodyMat)
  body.position.set(0, 0.5, 0)
  body.castShadow = true
  group.add(body)

  const cabinGeo = new THREE.BoxGeometry(1.8, 0.8, 2)
  const cabin = new THREE.Mesh(cabinGeo, new THREE.MeshStandardMaterial({ color: '#333333', flatShading: true }))
  cabin.position.set(0, 1.2, -0.3)
  cabin.castShadow = true
  group.add(cabin)

  const wheelPositions: [number, number, number][] = [
    [-1.1, 0.4, 1.5],
    [1.1, 0.4, 1.5],
    [-1.1, 0.4, -1.5],
    [1.1, 0.4, -1.5]
  ]

  wheelPositions.forEach(pos => {
    const wheel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.4, 0.3, 8),
      new THREE.MeshStandardMaterial({ color: '#222222', flatShading: true })
    )
    wheel.rotation.z = Math.PI / 2
    wheel.position.set(...pos)
    wheel.castShadow = true
    group.add(wheel)
  })

  return group
}

export function createSUV(color: string = '#3498db') {
  const group = new THREE.Group()

  const bodyGeo = new THREE.BoxGeometry(2.2, 1.4, 4.5)
  const body = new THREE.Mesh(bodyGeo, new THREE.MeshStandardMaterial({ color, flatShading: true }))
  body.position.set(0, 0.7, 0)
  body.castShadow = true
  group.add(body)

  const cabinGeo = new THREE.BoxGeometry(2, 1.2, 2.5)
  const cabin = new THREE.Mesh(cabinGeo, new THREE.MeshStandardMaterial({ color: '#333333', flatShading: true }))
  cabin.position.set(0, 1.7, -0.2)
  cabin.castShadow = true
  group.add(cabin)

  const wheelPositions: [number, number, number][] = [
    [-1.3, 0.5, 1.8],
    [1.3, 0.5, 1.8],
    [-1.3, 0.5, -1.8],
    [1.3, 0.5, -1.8]
  ]

  wheelPositions.forEach(pos => {
    const wheel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.35, 8),
      new THREE.MeshStandardMaterial({ color: '#222222', flatShading: true })
    )
    wheel.rotation.z = Math.PI / 2
    wheel.position.set(...pos)
    wheel.castShadow = true
    group.add(wheel)
  })

  return group
}

export function createPickup(color: string = '#2ecc71') {
  const group = new THREE.Group()

  const cabinGeo = new THREE.BoxGeometry(2, 1.5, 2)
  const cabin = new THREE.Mesh(cabinGeo, new THREE.MeshStandardMaterial({ color, flatShading: true }))
  cabin.position.set(0, 0.75, 1)
  cabin.castShadow = true
  group.add(cabin)

  const roofGeo = new THREE.BoxGeometry(2, 0.8, 2)
  const roof = new THREE.Mesh(roofGeo, new THREE.MeshStandardMaterial({ color: '#333333', flatShading: true }))
  roof.position.set(0, 1.65, 1)
  roof.castShadow = true
  group.add(roof)

  const bedGeo = new THREE.BoxGeometry(2, 0.8, 2.5)
  const bed = new THREE.Mesh(bedGeo, new THREE.MeshStandardMaterial({ color, flatShading: true }))
  bed.position.set(0, 0.4, -1.25)
  bed.castShadow = true
  group.add(bed)

  const wheelPositions: [number, number, number][] = [
    [-1.2, 0.45, 1.5],
    [1.2, 0.45, 1.5],
    [-1.2, 0.45, -1.8],
    [1.2, 0.45, -1.8]
  ]

  wheelPositions.forEach(pos => {
    const wheel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.45, 0.35, 8),
      new THREE.MeshStandardMaterial({ color: '#222222', flatShading: true })
    )
    wheel.rotation.z = Math.PI / 2
    wheel.position.set(...pos)
    wheel.castShadow = true
    group.add(wheel)
  })

  return group
}

export function createBus(color: string = '#f39c12') {
  const group = new THREE.Group()

  const bodyGeo = new THREE.BoxGeometry(2.5, 2, 6)
  const body = new THREE.Mesh(bodyGeo, new THREE.MeshStandardMaterial({ color, flatShading: true }))
  body.position.set(0, 1, 0)
  body.castShadow = true
  group.add(body)

  const windowGeo = new THREE.BoxGeometry(2.3, 0.8, 5.5)
  const windows = new THREE.Mesh(windowGeo, new THREE.MeshStandardMaterial({ color: '#87ceeb', flatShading: true }))
  windows.position.set(0, 1.8, 0)
  windows.castShadow = true
  group.add(windows)

  const wheelPositions: [number, number, number][] = [
    [-1.4, 0.5, 2],
    [1.4, 0.5, 2],
    [-1.4, 0.5, -2],
    [1.4, 0.5, -2]
  ]

  wheelPositions.forEach(pos => {
    const wheel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.4, 8),
      new THREE.MeshStandardMaterial({ color: '#222222', flatShading: true })
    )
    wheel.rotation.z = Math.PI / 2
    wheel.position.set(...pos)
    wheel.castShadow = true
    group.add(wheel)
  })

  return group
}
