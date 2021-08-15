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
        let { main } = getState()
        return await get(`store/reports/${body}`, main.Token)
    }
)

export const editProfile = createAsyncThunk(
    'main/editProfile',
    async ({ data }, { dispatch, getState }) => {
        let token = localStorage.getItem("Token")
        let { main } = getState()
        return await postWithUpload(`user/edit/${main.User.id}`, data, main.Token).then(response => response.json())
    }
)

export const getUserData = createAsyncThunk(
    'main/editProfile',
    async (body, { dispatch, getState }) => {
        let { main } = getState()
        return await get(`user/user`, main.Token)
    }
)

export const verifyToken = createAsyncThunk(
    'main/token',
    async (body, { dispatch, getState }) => {
        let token = localStorage.getItem("Token")
        return await get(`auth/token/${localStorage.getItem('id')}`, token)
    }
)



export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        User: null,
        Token: "",
        status: '',
        Authorized: false,
        total_sales: 0,
        updateTotalItems: 0,
        onHold: 0,
        yearSales: []
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
        },
        updateYearlySales: (state, { payload }) => {
            state.yearSales.push(payload)
        },
        resetYearSales: (state, { payload }) => {
            state.yearSales = []
        },
        logout: (state, { payload }) => {
            state.Token = ''
            state.User = null
            state.Authorized = false
        }
    },
    extraReducers: {

        //? LOGIN :

        [login.pending]: (state, action) => {
            state.status = 'loading'
        },
        [login.fulfilled]: (state, { payload }) => {
            if (payload) {
                let { User, Token } = payload
                state.User = User
                state.Token = Token
                state.status = "success"
                localStorage.setItem('Token', Token)
                localStorage.setItem('id', User.id)
                state.Authorized = true
            }
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
                localStorage.setItem('id', User.id)
                state.Authorized = true
            }

        },
        [register.rejected]: (state, action) => {
            state.status = 'failed'
        },

        //? geting  Store reports  : 

        [getStoreReports.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getStoreReports.fulfilled]: (state, { payload }) => {
            state.onHold = state.onHold + payload[2].total
        },
        [getStoreReports.rejected]: (state, action) => {
            state.status = 'failed'
        },

        //? Editing User Infos : 

        [editProfile.pending]: (state, action) => {
            state.status = 'loading'
        },
        [editProfile.fulfilled]: (state, { payload }) => {
            state.User = payload
        },
        [editProfile.rejected]: (state, action) => {
            state.status = 'failed'
        },

        //? geting User Data : 

        [getUserData.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getUserData.fulfilled]: (state, { payload }) => {
            state.User = payload
        },
        [getUserData.rejected]: (state, action) => {
            state.status = 'failed'
        },

        //? verifyToken Token : 

        [verifyToken.pending]: (state, action) => {
            state.status = 'loading'
        },
        [verifyToken.fulfilled]: (state, { payload }) => {
            if (payload.message) {
                state.Authorized = true
                state.Token = localStorage.getItem('Token')
            } else if (payload.error) {
                state.Authorized = false
                state.Token = ''
                localStorage.removeItem('Token')
                localStorage.removeItem('id')
            }
        },
        [verifyToken.rejected]: (state, action) => {
            state.status = 'failed'
        },
    },
})


export const { updateTotal, resetTotal, updateTotalItems, resetItems, resetHold, updateYearlySales, resetYearSales, logout } = mainSlice.actions;
export default mainSlice.reducer;