import { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { VehicleController } from '@/systems/VehicleController'
import { CustomWheels } from '@/components/CustomWheels'
import { DriftSmoke } from '@/components/DriftSmoke'
import { NitroEffects } from '@/components/NitroEffects'
import { useVehicleStore } from '@/stores/vehicleStore'
import * as THREE from 'three'

export function Vehicle() {
  const bodyRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/2021_lamborghini_countach_lpi_800-4.glb')
  const [wheelPositions, setWheelPositions] = useState<THREE.Vector3[]>([])
  const isDrifting = useVehicleStore((state) => state.isDrifting)
  const [spawnPosition] = useState(() => {
    // 随机选择一条公路
    const roads = [
      { x: 0, z: Math.random() * 400 - 200 }, // 竖向公路
      { x: Math.random() * 400 - 200, z: 0 }  // 横向公路
    ]
    const road = roads[Math.floor(Math.random() * roads.length)]
    return [road.x, 2, road.z] as [number, number, number]
  })

  useEffect(() => {
    if (bodyRef.current && scene) {
      const cloned = scene.clone()

      const meshes: { mesh: THREE.Mesh; box: THREE.Box3; center: THREE.Vector3; minY: number }[] = []

      cloned.traverse((obj) => {
        if (obj instanceof THREE.Mesh && obj.geometry) {
          const box = new THREE.Box3().setFromObject(obj)
          const center = new THREE.Vector3()
          box.getCenter(center)

          meshes.push({ mesh: obj, box, center, minY: box.min.y })
        }
      })

      const sortedByMinY = meshes.sort((a, b) => a.minY - b.minY)
      const bottomMeshes = sortedByMinY.slice(0, 4)

      const sortedByX = [...bottomMeshes].sort((a, b) => a.center.x - b.center.x)

      const leftMeshes = sortedByX.slice(0, Math.ceil(sortedByX.length / 2))
      const rightMeshes = sortedByX.slice(Math.ceil(sortedByX.length / 2))

      const frontLeft = leftMeshes.reduce((prev, curr) =>
        curr.center.z > prev.center.z ? curr : prev
      )
      const rearLeft = leftMeshes.reduce((prev, curr) =>
        curr.center.z < prev.center.z ? curr : prev
      )
      const frontRight = rightMeshes.reduce((prev, curr) =>
        curr.center.z > prev.center.z ? curr : prev
      )
      const rearRight = rightMeshes.reduce((prev, curr) =>
        curr.center.z < prev.center.z ? curr : prev
      )

      const wheels = [frontLeft, frontRight, rearLeft, rearRight]
      const positions = wheels.map(w => w.center.clone())

      setWheelPositions(positions)
      bodyRef.current.add(cloned)

      // 暴力隐藏所有轮胎区域的 Mesh
      cloned.traverse((obj) => {
        if (!(obj instanceof THREE.Mesh)) return

        const box = new THREE.Box3().setFromObject(obj)
        const center = new THREE.Vector3()
        box.getCenter(center)

        const isWheelArea =
          center.y < 0 &&
          (Math.abs(center.x + 3.9) < 1 || Math.abs(center.x + 0.3) < 1)

        if (isWheelArea) {
          obj.visible = false
        }
      })
    }
  }, [scene])

  return (
    <group ref={bodyRef} position={spawnPosition}>
      <VehicleController bodyRef={bodyRef} />
      {wheelPositions.length === 4 && (
        <>
          <CustomWheels positions={wheelPositions} />
          <DriftSmoke bodyRef={bodyRef} wheelPositions={wheelPositions} isDrifting={isDrifting} />
          <NitroEffects bodyRef={bodyRef} />
        </>
      )}
    </group>
  )
}
