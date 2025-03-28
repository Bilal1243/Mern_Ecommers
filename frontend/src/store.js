import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import { apiSlice } from './slices/apiSlice'
import cartSliceReducer from './slices/cartSlice'


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        cart : cartSliceReducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})