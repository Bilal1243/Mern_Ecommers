import { apiSlice } from "./apiSlice";

const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (data) => ({
                url: '/api/admin/addProduct',
                method: 'POST',
                body: data
            })
        }),
        getProducts: builder.query({
            query: () => ({
                url: '/api/admin/getProducts'
            })
        }),
        getProductById: builder.query({
            query: (params) => ({
                url: '/api/admin/getProductById',
                params
            })
        }),
        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `/api/admin/updateProduct/${id}`,
                method: 'PATCH',
                body: data
            })
        })
    })
})


export const {
    useAddProductMutation,
    useGetProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation
} = adminApiSlice