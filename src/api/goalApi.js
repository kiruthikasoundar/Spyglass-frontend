import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const goalApi = createApi({
  reducerPath: 'goalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URI}/goals`,
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
        uploadImage: builder.mutation({
          query: ( {id, image} ) => {
              const formData = new FormData();
              formData.append('image', image);
      
              return {
                url: `/${id}/upload`,
                method: 'PUT',
                body: formData,
              };
          }
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
  useDeleteGoalMutation,
  useUploadImageMutation,
} = goalApi;