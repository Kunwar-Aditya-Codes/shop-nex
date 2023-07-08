import { StateCreator } from "zustand";

export interface UserSlice {
  user: {} | null;
}

const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
  user: null,
});

export default createUserSlice;
