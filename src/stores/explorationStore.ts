import { create } from 'zustand'
import type { ExplorationPoint } from '@/types'

interface ExplorationStore {
  points: ExplorationPoint[]
  discoveredCount: number
  exploredPercentage: number
  discoverPoint: (id: string) => void
  initializePoints: (points: ExplorationPoint[]) => void
}

export const useExplorationStore = create<ExplorationStore>((set) => ({
  points: [],
  discoveredCount: 0,
  exploredPercentage: 0,
  discoverPoint: (id) => set((state) => {
    const newPoints = state.points.map(p =>
      p.id === id ? { ...p, discovered: true } : p
    )
    const discovered = newPoints.filter(p => p.discovered).length
    return {
      points: newPoints,
      discoveredCount: discovered,
      exploredPercentage: Math.round((discovered / newPoints.length) * 100)
    }
  }),
  initializePoints: (points) => set({ points, discoveredCount: 0, exploredPercentage: 0 })
}))
