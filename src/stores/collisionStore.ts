import { create } from 'zustand'

interface CollisionObject {
  id: string
  position: [number, number, number]
  radius: number
}

interface CollisionStore {
  npcVehicles: CollisionObject[]
  buildings: CollisionObject[]
  registerNPC: (id: string, position: [number, number, number], radius: number) => void
  updateNPC: (id: string, position: [number, number, number]) => void
  checkCollision: (position: [number, number, number], radius: number, excludeId?: string) => boolean
}

export const useCollisionStore = create<CollisionStore>((set, get) => ({
  npcVehicles: [],
  buildings: [],

  registerNPC: (id, position, radius) => set((state) => ({
    npcVehicles: [...state.npcVehicles.filter(v => v.id !== id), { id, position, radius }]
  })),

  updateNPC: (id, position) => set((state) => ({
    npcVehicles: state.npcVehicles.map(v => v.id === id ? { ...v, position } : v)
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
  }
}))
