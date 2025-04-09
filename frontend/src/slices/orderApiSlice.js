import { apiSlice } from './apiSlice'

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: '/api/order',
                method: 'POST',
                body: data
            })
        }),
        getOrderById: builder.query({
            query: (id) => ({
                url: `/api/order/${id}`
            })
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: '/api/order/mine'
            })
        }),
        getOrders: builder.query({
            query: () => ({
                url: '/api/order'
            })
        }),
        orderDeliver: builder.mutation({
            query: (id) => ({
                url: `/api/order/${id}`,
                method: 'PUT',
                body: id
            })
        }),
        orderToPaid: builder.mutation({
            query: (id) => ({
                url: `/api/order/${id}/pay`,
                method: 'PUT',
                body: id
            })
        })
    })
})



export const {
    useCreateOrderMutation,
    useGetOrderByIdQuery,
    useGetMyOrdersQuery,
    useGetOrdersQuery,
    useOrderDeliverMutation,
    useOrderToPaidMutation } = orderApiSlice