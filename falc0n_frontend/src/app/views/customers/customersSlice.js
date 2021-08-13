import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useFetch } from '../../Hooks/useFetch'
import { show } from '../Error/errorSlice'
import { activateModal } from '../Modal/modalSlice';


const { post, get } = useFetch

export const getCustomers = createAsyncThunk(
    'customers/get',
    async (body, { dispatch, getState }) => {
        let { stores } = getState()
        let id = stores.selectedStore.store.id
        return get(`store/customers/${id}`)
    }
)

export const customerDelete = createAsyncThunk(
    'customers/get',
    async (body, { dispatch, getState }) => {
        let { stores } = getState()
        let id = stores.selectedStore.store.id
        return get(`store/deleteCustomer/${id}/${body}`).then(() => {
            dispatch(getCustomers())
            dispatch(activateModal(false))
        })
    }
)

const initialState = {
    customers: [],
    selectedCustomer: {
        action: "",
        infos: {}
    },
    status: ''
};



export const customersSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        selectCustomer: (state, { payload }) => {
            let { action, infos } = payload
            state.selectedCustomer.action = action
            state.selectedCustomer.infos = infos
        },

    },
    extraReducers: {
        [getCustomers.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getCustomers.fulfilled]: (state, { payload }) => {
            state.status = 'success'
            state.customers = payload

        },
        [getCustomers.rejected]: (state, action) => {
            state.status = 'failed'
        },
    }
});


export const { selectCustomer } = customersSlice.actions;
export default customersSlice.reducer;
