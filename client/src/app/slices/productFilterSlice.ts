import { StateCreator } from 'zustand';

export interface ProductFilterSlice {
  rating: number;
  price: number;
  setRating: (rating: number) => void;
  setPrice: (price: number) => void;
}

const createProductFilterSlice: StateCreator<
  ProductFilterSlice,
  [],
  [],
  ProductFilterSlice
> = (set) => ({
  rating: 0,
  price: 0,
  setRating: (rating) => set((state) => ({ ...state, rating })),
  setPrice: (price) => set((state) => ({ ...state, price })),
});

export default createProductFilterSlice;
