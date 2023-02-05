import { configureStore } from '@reduxjs/toolkit'
import authReducer, {authSlice} from './auth/authSlice';
export default configureStore({
    reducer: {
        [authSlice.name]: authReducer
    },
})