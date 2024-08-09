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
  },
});

export const { setCart, setLoading, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
