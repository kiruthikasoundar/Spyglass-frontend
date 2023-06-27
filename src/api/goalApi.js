import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const goalApi = createApi({
  reducerPath: 'goalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/goals',
    credentials: 'include'
  }),
    endpoints: (builder) => { return {
        getGoalsByUserId: builder.query({
            query: () => ''
        }),
        createGoal: builder.mutation({
            query: (goal) => { return {
                method: 'POST',
                body: goal
            }}
        }),
        updateGoal: builder.mutation({
            query: (goal) => { return {
                method: 'PUT',
                url: `/${goal.id}`,
                body: goal
            }}
        }),
        deleteGoal: builder.mutation({
            query: (id) => { return {
                method: 'DELETE',
                url: `/${id}`,
            }}
        })
    }}
})

export const {
  useGetGoalsByUserIdQuery,
  useCreateGoalMutation,
  useUpdateGoalMutation,
  useDeleteGoalMutation
} = goalApi;