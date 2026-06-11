import { NPCVehicle } from '@/entities/NPCVehicle'

export function TrafficSystem() {
  const vehicles = [
    { id: 1, color: '#3498db', x: -200, z: 0, horizontal: true, type: 'sedan' as const },
    { id: 2, color: '#e74c3c', x: 200, z: 0, horizontal: true, type: 'suv' as const }
  ]

  return (
    <group>
      {vehicles.map((v) => (
        <NPCVehicle
          key={v.id}
          id={v.id}
          color={v.color}
          startX={v.x}
          startZ={v.z}
          horizontal={v.horizontal}
          type={v.type}
        />
      ))}
    </group>
  )
}
