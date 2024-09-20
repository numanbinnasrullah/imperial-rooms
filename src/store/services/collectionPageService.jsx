import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const collectionService = createApi({
    reducerPath: 'collection',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://imperial-rooms.vercel.app/api/',
    }),
    endpoints: (builder) => ({
        getCollection: builder.mutation({
            query: (collectionData) => ({
                url: 'collection',
                method: 'POST',
                body: JSON.stringify(collectionData)
            }),
        }),
        getFilters: builder.mutation({
            query: (filtersData) => ({
                url: 'filters',
                method: 'POST',
                body: filtersData
            }),
        }),
    }),
});

export const { useGetCollectionMutation, useGetFiltersMutation } = collectionService;
export default collectionService;
