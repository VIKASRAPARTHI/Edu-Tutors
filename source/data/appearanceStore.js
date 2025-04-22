import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppearanceStore = create(
  persist(
    (set) => ({
      isNightMode: false,
      toggleAppearance: () => set((state) => ({ isNightMode: !state.isNightMode })),
    }),
    {
      name: 'appearance-storage', // unique name for the localStorage key
    }
  )
)

export default useAppearanceStore
