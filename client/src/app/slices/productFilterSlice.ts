import { StateCreator } from 'zustand';

export interface ProductFilterSlice {
  price: number;
  category: string;
  setPrice: (price: number) => void;
  setCategory: (category: string) => void;
}

const createProductFilterSlice: StateCreator<
  ProductFilterSlice,
  [],
  [],
  ProductFilterSlice
> = (set) => ({
  price: 0,
  category: '',
  setPrice: (price) => set((state) => ({ ...state, price })),
  setCategory: (category) => set((state) => ({ ...state, category })),
});

export default createProductFilterSlice;
