import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";

export const fetchBrands = createAsyncThunk(
  "brands/fetch",
  async () => {
    const res = await api.get("/brands");
    return res.data;
  }
);

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default brandSlice.reducer;
