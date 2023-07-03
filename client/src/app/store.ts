import { create } from "zustand";
import createCartSlice, { CartSlice } from "./slices/cartSlice";

export const useBoundStore = create<CartSlice>()((...a) => ({
  ...createCartSlice(...a),
}));
