import { StateCreator } from 'zustand';

export interface UserSlice {
  user: {} | null;
  setUser: (
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      isVerified: boolean;
      email: string;
      address: string[];
      profileImage: string;
    } | null
  ) => void;
}

const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
  user: null,

  setUser: (user) =>
    set(() => {
      return {
        user,
      };
    }),
});

export default createUserSlice;
