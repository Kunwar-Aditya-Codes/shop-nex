import { create } from "zustand";
import createCartSlice, { CartSlice } from "./slices/cartSlice";
import createAuthSlice, { AuthSlice } from "./slices/authSlice";

export const useBoundStore = create<CartSlice & AuthSlice>()((...a) => ({
  ...createCartSlice(...a),
  ...createAuthSlice(...a),
}));
