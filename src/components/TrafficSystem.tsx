import { NPCVehicle } from '@/entities/NPCVehicle'

export function TrafficSystem() {
  const vehicles = [
    { id: 1, color: '#3498db', x: -200, z: 0, horizontal: true, type: 'sedan' as const },
    { id: 2, color: '#e74c3c', x: 200, z: 0, horizontal: true, type: 'suv' as const },
    { id: 3, color: '#2ecc71', x: 0, z: -200, horizontal: false, type: 'pickup' as const },
    { id: 4, color: '#f39c12', x: 0, z: 200, horizontal: false, type: 'sedan' as const },
    { id: 5, color: '#9b59b6', x: -300, z: 100, horizontal: true, type: 'suv' as const },
    { id: 6, color: '#1abc9c', x: 300, z: -100, horizontal: true, type: 'pickup' as const },
    { id: 7, color: '#e67e22', x: 100, z: -300, horizontal: false, type: 'sedan' as const },
    { id: 8, color: '#34495e', x: -100, z: 300, horizontal: false, type: 'bus' as const },
    { id: 9, color: '#16a085', x: -400, z: -200, horizontal: true, type: 'sedan' as const },
    { id: 10, color: '#c0392b', x: 400, z: 200, horizontal: true, type: 'suv' as const }
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
