import { create } from "zustand";
import createCartSlice, { CartSlice } from "./slices/cartSlice";
import createAuthSlice, { AuthSlice } from "./slices/authSlice";
import createUserSlice, { UserSlice } from "./slices/userSlice";

export const useBoundStore = create<CartSlice & AuthSlice & UserSlice>()(
  (...a) => ({
    ...createCartSlice(...a),
    ...createAuthSlice(...a),
    ...createUserSlice(...a),
  })
);
