import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      
      login: (userData) => set({ 
        user: userData,
        isLoggedIn: true 
      }),
      
      logout: () => set({ 
        user: null,
        isLoggedIn: false 
      }),
      
      updateUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData }
      })),
    }),
    {
      name: 'user-storage',
    }
  )
)

export default useUserStore
