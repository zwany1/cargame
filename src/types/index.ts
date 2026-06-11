export interface VehicleState {
  position: [number, number, number]
  rotation: [number, number, number]
  velocity: [number, number, number]
  speed: number
  steering: number
  isDrifting: boolean
  nitroAmount: number
  isUsingNitro: boolean
}

export interface ExplorationPoint {
  id: string
  position: [number, number, number]
  name: string
  discovered: boolean
  radius: number
}

export interface GameState {
  time: number
  dayPhase: 'day' | 'dusk' | 'night'
  exploredPercentage: number
}

export interface NPCVehicle {
  id: string
  position: [number, number, number]
  rotation: number
  pathIndex: number
}
