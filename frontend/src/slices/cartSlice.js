import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils'

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :
    { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' }



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { user, rating, numReviews, reviews, ...items } = action.payload

            const existItem = state.cartItems.find((x) => x._id === items.Id)

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? items : x)
            }
            else {
                state.cartItems = [...state.cartItems, items]
            }

            return updateCart(state, items)

        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
            return updateCart(state)
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
            localStorage.setItem('cart', JSON.stringify(state))
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
            localStorage.setItem('cart', JSON.stringify(state))
        },
        clearCartItems: (state, action) => {
            state.cartItems = []
            localStorage.setItem('cart', JSON.stringify(state))
        },
        resetCart: (state) => state = initialState
    }
})

export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems,
    resetCart
} = cartSlice.actions

export default cartSlice.reducer