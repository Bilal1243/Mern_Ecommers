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
        }),
        getUsers: builder.query({
            query: () => ({
                url: '/api/users/getAllUsers'
            })
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `/api/users/${id}`
            })
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/api/users/${userId}`,
                method: 'DELETE'
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `/api/users/${data.userId}`,
                method: 'PUT',
                body: data
            })
        })
    })
})


export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useGetProductsQuery,
    useUpdateUserProfileMutation,
    useLogoutUserMutation,
    useGetUsersQuery,
    useGetUserByIdQuery,
    useDeleteUserMutation,
    useUpdateUserMutation
} = userApiSlice