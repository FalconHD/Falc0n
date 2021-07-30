import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedStore: {
        store: {},
        orders: []
    },
    sidebar: {
        show: false
    }
};



export const storesSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        select: (state, { payload }) => {
            state.selectedStore = payload
        },
        rightSetActive: (state, { payload }) => {
            state.sidebar.show = payload
        }
    }
});


export const { select, rightSetActive } = storesSlice.actions;
export default storesSlice.reducer;
