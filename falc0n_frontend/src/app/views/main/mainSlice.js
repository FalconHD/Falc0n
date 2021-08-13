import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useFetch } from '../../Hooks/useFetch'
import { show } from '../Error/errorSlice'


const { post, get } = useFetch

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


export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        User: {},
        Token: "",
        status: ''
    },
    reducers: {

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
    },
})


export const { } = mainSlice.actions;
export default mainSlice.reducer;