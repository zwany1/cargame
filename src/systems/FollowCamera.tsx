import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { useVehicleStore } from '@/stores/vehicleStore'
import * as THREE from 'three'

export function FollowCamera() {
  const { camera } = useThree()
  const bodyRef = useVehicleStore((state) => state.bodyRef)
  const isDrifting = useVehicleStore((state) => state.drifting)
  const isNitro = useVehicleStore((state) => state.usingNitro)
  const speed = useVehicleStore((state) => state.speed)

  const currentPosition = useRef(new THREE.Vector3(0, 10, 20))
  const currentLookAt = useRef(new THREE.Vector3())
  const baseFov = useRef(75)

  useFrame((_, delta) => {
    if (!bodyRef?.current) return

    const vehicle = bodyRef.current
    const carPosition = vehicle.position.clone()
    const carQuaternion = vehicle.quaternion.clone()

    const euler = new THREE.Euler()
    euler.setFromQuaternion(carQuaternion)

    const yawOnlyQuaternion = new THREE.Quaternion()
    yawOnlyQuaternion.setFromEuler(new THREE.Euler(0, euler.y, 0))

    // 氮气时镜头后移
    const cameraDistance = isNitro ? 18 : 15
    const offset = new THREE.Vector3(0, 8, cameraDistance)
    offset.applyQuaternion(yawOnlyQuaternion)

    const desiredCameraPosition = carPosition.clone().add(offset)

    // 漂移时镜头抖动
    if (isDrifting) {
      desiredCameraPosition.x += (Math.random() - 0.5) * 0.3
      desiredCameraPosition.y += (Math.random() - 0.5) * 0.2
      desiredCameraPosition.z += (Math.random() - 0.5) * 0.3
    }

    // 氮气启动瞬间震动
    if (isNitro) {
      desiredCameraPosition.x += (Math.random() - 0.5) * 0.15
      desiredCameraPosition.y += (Math.random() - 0.5) * 0.15
    }

    currentPosition.current.lerp(
      desiredCameraPosition,
      1 - Math.exp(-5 * delta)
    )

    camera.position.copy(currentPosition.current)

    const forward = new THREE.Vector3(0, 0, -10)
    forward.applyQuaternion(yawOnlyQuaternion)

    const desiredLookAt = carPosition
      .clone()
      .add(forward)
      .add(new THREE.Vector3(0, 1, 0))

    currentLookAt.current.lerp(
      desiredLookAt,
      1 - Math.exp(-8 * delta)
    )

    camera.lookAt(currentLookAt.current)

    // FOV 动态变化
    let targetFov = 75 + (speed / 60) * 5
    if (isDrifting) targetFov = 85
    if (isNitro) targetFov = 90

    baseFov.current += (targetFov - baseFov.current) * delta * 3

    if ('fov' in camera) {
      ;(camera as THREE.PerspectiveCamera).fov = baseFov.current
      ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()
    }
  })

  return null
}
