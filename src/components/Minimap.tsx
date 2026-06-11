import { useVehicleStore } from '@/stores/vehicleStore'
import { useExplorationStore } from '@/stores/explorationStore'

export function Minimap() {
  const position = useVehicleStore((state) => state.position)
  const rotation = useVehicleStore((state) => state.rotation)
  const points = useExplorationStore((state) => state.points)

  const mapSize = 150
  const worldSize = 2000
  const scale = mapSize / worldSize

  return (
    <div style={{
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: mapSize,
      height: mapSize,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      border: '2px solid rgba(255, 255, 255, 0.5)',
      borderRadius: 8,
      overflow: 'hidden'
    }}>
      {points.map((point) => {
        const x = (point.position[0] + worldSize / 2) * scale
        const y = (point.position[2] + worldSize / 2) * scale

        return (
          <div
            key={point.id}
            style={{
              position: 'absolute',
              left: x - 3,
              top: y - 3,
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: point.discovered ? '#00ff00' : '#ffff00',
              opacity: point.discovered ? 0.5 : 1
            }}
          />
        )
      })}

      <div
        style={{
          position: 'absolute',
          left: (position[0] + worldSize / 2) * scale - 4,
          top: (position[2] + worldSize / 2) * scale - 4,
          width: 8,
          height: 8,
          backgroundColor: '#ff0000',
          borderRadius: '50%',
          transform: `rotate(${rotation[1]}rad)`,
          border: '2px solid white'
        }}
      >
        <div style={{
          position: 'absolute',
          width: 0,
          height: 0,
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderBottom: '8px solid white',
          top: -8,
          left: 0
        }} />
      </div>
    </div>
  )
}
