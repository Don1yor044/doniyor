import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  categories: any;
}

const initialState: CounterState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setData } = categoriesSlice.actions;

export default categoriesSlice.reducer;
