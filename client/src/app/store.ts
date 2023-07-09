import { create } from 'zustand';
import createCartSlice, { CartSlice } from './slices/cartSlice';
import createAuthSlice, { AuthSlice } from './slices/authSlice';
import createUserSlice, { UserSlice } from './slices/userSlice';
import { persist } from 'zustand/middleware';

export const useBoundStore = create<CartSlice & AuthSlice & UserSlice>()(
  persist(
    (...a) => ({
      ...createCartSlice(...a),
      ...createAuthSlice(...a),
      ...createUserSlice(...a),
    }),
    {
      name: 'cartItems',
      partialize: (state) => ({
        products: state.products,
      }),
    }
  )
);
