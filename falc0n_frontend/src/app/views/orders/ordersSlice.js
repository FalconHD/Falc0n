import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedStore: {
        store: {},
        products: [],
        orders: []
    },
    sidebar: {
        show: false
    }
};



export const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        select: (state, { payload }) => {
            let { store, products } = payload
            state.selectedStore = {
                ...state.selectedStore,
                store,
                products
            }
        },
        rightSetActive: (state, { payload }) => {
            state.sidebar.show = payload
        },
        addOrders: (state, { payload }) => {
            let order = payload
            if (order.length > 0) {
                state.selectedStore = {
                    ...state.selectedStore,
                    orders: [
                        ...state.selectedStore.orders,
                        ...order
                    ]
                }
            }
        },
        reset: (state) => {
            state.selectedStore.orders = []
        }
    }
});


export const { select, rightSetActive, addOrders, reset } = salesSlice.actions;
export default salesSlice.reducer;
