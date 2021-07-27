import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeLinkName: "",
  show: false,
};



export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setActive: (state, payload) => {
      state.show = payload
    },
    updateName: (state, payload) => {
      state.activeLinkName = payload
    }
  }
});


export const { setActive, updateName } = sidebarSlice.actions;
export default sidebarSlice.reducer;
