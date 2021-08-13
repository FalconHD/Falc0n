import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useFetch } from '../../Hooks/useFetch'


const { get, post, postWithUpload } = useFetch

export const getStoreReports = createAsyncThunk(
  'stores/reports',
  async (body, { dispatch, getState }) => {
    let { stores } = getState()
    let id = stores.selectedStore.store.id
    return await get(`store/reports/${id}`)
  }
)
export const getOrders = createAsyncThunk(
  'stores/getOrders',
  async (body, { dispatch, getState }) => {
    let result = await get(`store/getProducts/${body.id}`)
    dispatch(select({ store: body, products: result }))
  }
)

export const deleteProduct = createAsyncThunk(
  'stores/deleteProduct',
  async (body, { dispatch, getState }) => {
    let { stores } = getState()
    let id = stores.selectedStore.store.id
    console.log(body);
    await get(`store/deleteProduct/${id}/${body}`)
    dispatch(getOrders(stores.selectedStore.store))
  }
)

export const editProduct = createAsyncThunk(
  'stores/editProduct',
  async ({data,id}, { dispatch, getState }) => {
    let { stores } = getState()
    let idx = stores.selectedStore.store.id
    console.log(data,id);
    await postWithUpload(`store/editProduct/${idx}/${id}`, data)
      .then(response => response.text())
      .then((result) => {
        dispatch(getOrders(stores.selectedStore.store))
      })

  }
)


const initialState = {
  selectedStore: {
    store: {},
    products: [],
    orders: [],
    reports: [],
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
  },
  extraReducers: {
    [getStoreReports.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getStoreReports.fulfilled]: (state, { payload }) => {
      state.selectedStore = {
        ...state.selectedStore,
        reports: payload
      }
    },
    [getStoreReports.rejected]: (state, action) => {
      state.status = 'failed'
    },
  }
});


export const { select, rightSetActive, addOrders, reset, addStatus } = storesSlice.actions;
export default storesSlice.reducer;
