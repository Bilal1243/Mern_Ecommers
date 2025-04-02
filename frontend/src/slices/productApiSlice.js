import { apiSlice } from "./apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ id }) => ({
        url: `/api/products/product/${id}`
      })
    }),
    addProductReview: builder.mutation({
      query: (data) => ({
        url: `/api/products/${data.productId}/reviews`,
        method: 'POST',
        body: data
      })
    })
  })
})


export const {
  useGetProductQuery,
  useAddProductReviewMutation
} = productApiSlice