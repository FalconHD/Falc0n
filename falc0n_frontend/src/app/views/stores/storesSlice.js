import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedStore: {
    store: {},
    products: [],
    orders: [],
    status: {}
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
    addStatus: (state, { payload }) => {
      state.selectedStore = {
        ...state.selectedStore,
        status: payload
      }
    },
    reset: (state) => {
      state.selectedStore.orders = []
    }
  }
});


export const { select, rightSetActive, addOrders, reset, addStatus } = storesSlice.actions;
export default storesSlice.reducer;
