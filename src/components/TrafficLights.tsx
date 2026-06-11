import { TrafficLight } from './TrafficLight'

export function TrafficLights() {
  const positions: [number, number, number][] = [
    [-10, 0, -10],
    [10, 0, -10],
    [-10, 0, 10],
    [10, 0, 10],
    [-60, 0, -60],
    [60, 0, -60],
    [-60, 0, 60],
    [60, 0, 60]
  ]

  return (
    <group>
      {positions.map((pos, i) => (
        <TrafficLight key={i} position={pos} />
      ))}
    </group>
  )
}
