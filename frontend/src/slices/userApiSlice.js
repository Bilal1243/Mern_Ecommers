import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/api/users',
                method: 'POST',
                body: data
            })
        }),
        registerUser: builder.mutation({
            query: (data) => ({
                url: '/api/users/register',
                method: 'POST',
                body: data
            })
        }),

        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: '/api/users/updateProfile',
                method: 'PUT',
                body: data
            })
        }),

        getProducts: builder.query({
            query: () => ({
                url: '/api/users/getProducts'
            })
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: '/api/users/logout',
                method: 'GET'
            })
        })
    })
})


export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useGetProductsQuery,
    useUpdateUserProfileMutation,
    useLogoutUserMutation
} = userApiSlice