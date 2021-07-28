import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedStore: {
    store:{},
    orders : []
  }
};



export const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    select: (state, {payload}) => {
      state.selectedStore = payload
    }
  }
});


export const { select } = storesSlice.actions;
export default storesSlice.reducer;
