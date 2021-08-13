import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useFetch } from '../../Hooks/useFetch'

const { post, get } = useFetch




export const errorSlice = createSlice({
    name: 'error',
    initialState: {
        message: '',
        status: '',
        active: false
    },
    reducers: {
        show: (state, { payload }) => {
            let { message, status, active } = payload
            state.message = message
            state.status = status
            state.active = active
        }
    },
})


export const { show } = errorSlice.actions;
export default errorSlice.reducer;