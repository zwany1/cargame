import { create } from 'zustand'

interface CollisionObject {
  id: string
  position: [number, number, number]
  radius: number
  speed?: number
}

interface CollisionInfo {
  object: CollisionObject
  distance: number
  direction: [number, number]
}

interface CollisionStore {
  npcVehicles: CollisionObject[]
  buildings: CollisionObject[]
  registerNPC: (id: string, position: [number, number, number], radius: number, speed?: number) => void
  updateNPC: (id: string, position: [number, number, number], speed?: number) => void
  checkCollision: (position: [number, number, number], radius: number, excludeId?: string) => boolean
  getCollisionInfo: (position: [number, number, number], radius: number, excludeId?: string) => CollisionInfo | null
}

export const useCollisionStore = create<CollisionStore>((set, get) => ({
  npcVehicles: [],
  buildings: [],

  registerNPC: (id, position, radius, speed = 0) => set((state) => ({
    npcVehicles: [...state.npcVehicles.filter(v => v.id !== id), { id, position, radius, speed }]
  })),

  updateNPC: (id, position, speed = 0) => set((state) => ({
    npcVehicles: state.npcVehicles.map(v => v.id === id ? { ...v, position, speed } : v)
  })),

  checkCollision: (position, radius, excludeId) => {
    const state = get()
    const allObjects = [...state.npcVehicles, ...state.buildings]

    for (const obj of allObjects) {
      if (obj.id === excludeId) continue

      const dx = position[0] - obj.position[0]
      const dz = position[2] - obj.position[2]
      const distance = Math.sqrt(dx * dx + dz * dz)

      if (distance < radius + obj.radius) {
        return true
      }
    }

    return false
  },

  getCollisionInfo: (position, radius, excludeId) => {
    const state = get()
    const allObjects = [...state.npcVehicles, ...state.buildings]
    let closest: CollisionInfo | null = null
    let minDistance = Infinity

    for (const obj of allObjects) {
      if (obj.id === excludeId) continue

      const dx = position[0] - obj.position[0]
      const dz = position[2] - obj.position[2]
      const distance = Math.sqrt(dx * dx + dz * dz)

      if (distance < radius + obj.radius && distance < minDistance) {
        minDistance = distance
        closest = {
          object: obj,
          distance,
          direction: distance > 0 ? [dx / distance, dz / distance] : [0, 1]
        }
      }
    }

    return closest
  }
}))
