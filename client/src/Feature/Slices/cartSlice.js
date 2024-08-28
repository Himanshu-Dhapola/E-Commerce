import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: null,
  isLoading: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
    clearCart(state) {
      state.cartItems = [];
      state.cart = null; 
      state.isLoading = false;
    },
  },
});

export const { setCart, setLoading, setCartItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
