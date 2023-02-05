import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loading } from '../../utils/loadingState'
import { signUpApi } from '../../api/auth.api'
import { getToken, removeToken, setToken } from '../../utils/storeAuthToken'

export const signUp = createAsyncThunk('posts/fetchPosts', async (data, {rejectWithValue}) => {
    try{
        const response = await signUpApi(data)
        return response.data
    }catch(error){
        if(!error.response) throw error
        return rejectWithValue(error.response.data)
    }
})

export const initialAuthSliceState = {
    loadingState: loading.idle,
    data: {
        status:null,
        message: null,
        token: getToken(),
    },
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthSliceState,
    reducers: {
        logout: (state) => {
            state.data.token = null;
            removeToken()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.pending, (state, {payload}) => {
            state.loadingState = loading.loading
            state.error = null;
            state.data = initialAuthSliceState.data
        }).addCase(signUp.fulfilled, (state, {payload}) => {
            state.loadingState = loading.success
            state.data = payload
            setToken(payload.token)
        }).addCase(signUp.rejected, (state, {payload}) => {
            state.loadingState = loading.fail
            state.error = payload
        })
    }
})

export const { logout } = authSlice.actions
export const getAuthLoadingState = (state) => state.auth.loadingState
export const getAuthError = (state) => state.auth.error
export const getAuthData = (state) => state.auth.data

export default authSlice.reducer
