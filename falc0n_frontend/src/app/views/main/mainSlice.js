import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useFetch } from '../../Hooks/useFetch'
import { show } from '../Error/errorSlice'


const { post, get, postWithUpload } = useFetch

//TODO : LOGIN
export const login = createAsyncThunk(
    'user/login',
    async (body, { dispatch, getState }) => {
        return post('auth/login', body).then(async (response) => {
            if (response.status != 200) {
                let result = await response.json()
                dispatch(
                    show({
                        message: result.error,
                        status: response.status,
                        active: true
                    })
                )
            } else {
                return response.json()
            }
        })
    }
)

//TODO : REGISTER
export const register = createAsyncThunk(
    'user/register',
    async (body, { dispatch, getState }) => {
        return post('auth/register', body).then(async (response) => {
            if (response.status != 200) {
                dispatch(
                    show({
                        message: "User Already registred with this Data",
                        status: "500",
                        active: true
                    })
                )
            } else {
                return response.json()
            }
        })
    }
)

export const getStoreReports = createAsyncThunk(
    'main/reports',
    async (body, { dispatch, getState }) => {
        return await get(`store/reports/${body}`)
    }
)

export const editProfile = createAsyncThunk(
    'main/editProfile',
    async ( body , { dispatch, getState }) => {
        let { main } = getState()
        return await postWithUpload(`user/edit/${main.User.id}`, body,main.Token)
    }
)

export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        User: {},
        Token: "",
        status: '',
        total_sales: 0,
        updateTotalItems: 0,
        onHold: 0
    },
    reducers: {
        updateTotal: (state, { payload }) => {
            state.total_sales = parseFloat(state.total_sales) + parseFloat(payload)
        },
        updateTotalItems: (state, { payload }) => {
            state.updateTotalItems = parseFloat(state.updateTotalItems) + parseFloat(payload)
        },
        resetTotal: (state, action) => {
            state.total_sales = 0
        },
        resetItems: (state, action) => {
            state.updateTotalItems = 0
        },
        resetHold: (state, action) => {
            state.onHold = 0
        }
    },
    extraReducers: {

        //? LOGIN :

        [login.pending]: (state, action) => {
            state.status = 'loading'
        },
        [login.fulfilled]: (state, { payload }) => {
            let { User, Token } = payload
            state.User = User
            state.Token = Token
            state.status = "success"
            localStorage.setItem('Token', Token)
        },
        [login.rejected]: (state, action) => {
            state.status = 'failed'
        },

        //? RESITER :

        [register.pending]: (state, action) => {
            state.status = 'loading'
        },
        [register.fulfilled]: (state, { payload }) => {
            if (payload) {
                let { User, Token } = payload
                state.User = User
                state.Token = Token
                state.status = "success"
                localStorage.setItem('Token', Token)
            }

        },
        [register.rejected]: (state, action) => {
            state.status = 'failed'
        },


        [getStoreReports.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getStoreReports.fulfilled]: (state, { payload }) => {
            state.onHold = state.onHold + payload[2].total
        },
        [getStoreReports.rejected]: (state, action) => {
            state.status = 'failed'
        },

    },
})


export const { updateTotal, resetTotal, updateTotalItems, resetItems, resetHold } = mainSlice.actions;
export default mainSlice.reducer;