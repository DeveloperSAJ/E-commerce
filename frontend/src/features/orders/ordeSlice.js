import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";

export const placeOrder = createAsyncThunk(
  "orders/place",
  async (orderData, thunkAPI) => {
    const res = await api.post("/orders", orderData);
    return res.data;
  }
);

export const fetchOrders = createAsyncThunk(
  "orders/fetch",
  async () => {
    const res = await api.get("/orders/my-orders");
    return res.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  },
});

export default orderSlice.reducer;
