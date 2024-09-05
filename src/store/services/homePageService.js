import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const homePageService = createApi({
    reducerPath: 'homePage',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://imperial-rooms.vercel.app/api/',
    }),
    endpoints: (builder) => ({
        getMenu: builder.query({
            query: () => ({
                url: 'menu',
                method: 'GET',
            }),
        }),
        getFeaturedCollections: builder.query({
            query: () => ({
                url: 'featuredCollections',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetMenuQuery, useGetFeaturedCollectionsQuery } = homePageService;
export default homePageService;
