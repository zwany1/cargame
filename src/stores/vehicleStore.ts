import { create } from 'zustand'
import type { VehicleState } from '@/types'
import * as THREE from 'three'

interface VehicleStore extends VehicleState {
  bodyRef: React.RefObject<THREE.Group> | null
  setBodyRef: (ref: React.RefObject<THREE.Group>) => void
  setPosition: (pos: [number, number, number]) => void
  setRotation: (rot: [number, number, number]) => void
  setVelocity: (vel: [number, number, number]) => void
  setSpeed: (speed: number) => void
  setSteering: (steering: number) => void
  setDrifting: (isDrifting: boolean) => void
  setNitro: (amount: number) => void
  setUsingNitro: (isUsing: boolean) => void
}

export const useVehicleStore = create<VehicleStore>((set) => ({
  position: [0, 2, 0],
  rotation: [0, 0, 0],
  velocity: [0, 0, 0],
  speed: 0,
  steering: 0,
  isDrifting: false,
  nitroAmount: 100,
  isUsingNitro: false,
  bodyRef: null,
  setBodyRef: (bodyRef) => set({ bodyRef }),
  setPosition: (position) => set({ position }),
  setRotation: (rotation) => set({ rotation }),
  setVelocity: (velocity) => set({ velocity }),
  setSpeed: (speed) => set({ speed }),
  setSteering: (steering) => set({ steering }),
  setDrifting: (isDrifting) => set({ isDrifting }),
  setNitro: (nitroAmount) => set({ nitroAmount }),
  setUsingNitro: (isUsingNitro) => set({ isUsingNitro })
}))
