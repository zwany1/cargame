import { create } from 'zustand'

interface TimeStore {
  time: number
  dayPhase: 'day' | 'dusk' | 'night'
  update: (delta: number) => void
}

export const useTimeStore = create<TimeStore>((set) => ({
  time: 0,
  dayPhase: 'day',
  update: (delta) => set((state) => {
    const newTime = (state.time + delta * 0.1) % 240
    let phase: 'day' | 'dusk' | 'night' = 'day'

    if (newTime >= 60 && newTime < 80) phase = 'dusk'
    else if (newTime >= 80 && newTime < 180) phase = 'night'

    return { time: newTime, dayPhase: phase }
  })
}))
