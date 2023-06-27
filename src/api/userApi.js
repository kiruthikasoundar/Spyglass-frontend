import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/', 
    credentials: 'include'
  }),
  endpoints: (builder) => { return {
    signin: builder.query({
      query: () => { return {
        url: 'signin'
      }}
    }),
    userInfo: builder.query({
      query: () => { return {
        url: 'userinfo'
      }}
    }),
    logout: builder.mutation({
        query: () => { return {
          method: 'POST',
          url: '/logout'
        }}
      })
  }}
})

export const {
  useSigninQuery,
  useUserInfoQuery,
  useLogoutMutation
} = userApi;