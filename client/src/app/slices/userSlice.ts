import { StateCreator } from "zustand";
import { axiosInstance } from "../../lib/api/axiosConfig";

export interface UserSlice {
  user: {} | null;
  setUser: (accessToken: string) => Promise<void>;
}

const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
  user: null,
  setUser: async (accessToken) => {
    const response = await axiosInstance.get("/customer/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = response.data.customer;

    set({
      user,
    });
  },
});

export default createUserSlice;
