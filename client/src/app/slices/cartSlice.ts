import { StateCreator } from 'zustand';

export interface CartSlice {
  totalAmount: number;
  totalItems: number;
  products: {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }[];
  addProducts: (product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }) => void;
  removeProducts: (productId: string) => void;
  calculateTotalItemsAndAmount: () => void;
  clearCart: () => void;
}

const createCartSlice: StateCreator<CartSlice, [], [], CartSlice> = (set) => ({
  products: [],
  totalAmount: 0,
  totalItems: 0,
  addProducts: (product) =>
    set((state) => {
      const existingProduct = state.products.find((p) => p._id === product._id);

      const updatedProducts = existingProduct
        ? state.products.map((p) =>
            p._id === product._id
              ? { ...p, quantity: p.quantity + product.quantity }
              : p
          )
        : [...state.products, { ...product, quantity: product.quantity }];

      const updatedTotalAmount =
        state.totalAmount + product.price * product.quantity;
      const updatedTotalItems = state.totalItems + product.quantity;

      return {
        ...state,
        products: updatedProducts,
        totalAmount: updatedTotalAmount,
        totalItems: updatedTotalItems,
      };
    }),

  removeProducts: (productId) =>
    set((state) => {
      const existingProduct = state.products.find((p) => p._id === productId);

      if (!existingProduct) {
        return state;
      }

      const updatedProducts =
        existingProduct.quantity === 1
          ? state.products.filter((p) => p._id !== productId)
          : state.products.map((p) =>
              p._id === productId ? { ...p, quantity: p.quantity - 1 } : p
            );

      const updatedTotalAmount = state.totalAmount - existingProduct.price;
      const updatedTotalItems = state.totalItems - 1;

      return {
        ...state,
        products: updatedProducts,
        totalAmount: updatedTotalAmount,
        totalItems: updatedTotalItems,
      };
    }),

  calculateTotalItemsAndAmount: () =>
    set((state) => {
      const totalItems = state.products.reduce(
        (sum, product) => sum + product.quantity,
        0
      );

      const totalAmount = state.products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );

      return {
        ...state,
        totalItems,
        totalAmount,
      };
    }),

  clearCart: () =>
    set(() => ({
      products: [],
      totalAmount: 0,
      totalItems: 0,
    })),
});

export default createCartSlice;
