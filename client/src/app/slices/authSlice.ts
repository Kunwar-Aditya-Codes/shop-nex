import { StateCreator } from "zustand";

export interface AuthSlice {
  token: string | undefined;
  setToken: (accessToken: string | undefined) => void;
  logout: () => void;
}

const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  token: undefined,
  
  setToken: (accessToken) =>
    set(() => {
      return {
        token: accessToken,
      };
    }),

  logout: () =>
    set(() => {
      return {
        token: undefined,
      };
    }),
});

export default createAuthSlice;
