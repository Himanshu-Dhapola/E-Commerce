import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null,
  isLoading: false,
  accessToken: localStorage?.getItem("accessToken")
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCustomer(state, action) {
      state.customer = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
});

export const { setCustomer, setLoading, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
