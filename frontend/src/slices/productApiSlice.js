import { apiSlice } from "./apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getProduct : builder.query({
        query : ({id}) => ({
            url : `/api/products/product/${id}`
        })
      })

    })
})


export const {
    useGetProductQuery
} = productApiSlice