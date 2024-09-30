import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cartPageService = createApi({
    reducerPath: 'cartPage',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/',
    }),
    endpoints: (builder) => ({
        cartCreate: builder.mutation({
            query: (createCartData) => (console.log("Create Cart Toolkit data",createCartData),{
                url: 'cartcreate',
                method: 'POST',
                body: createCartData
            }),
        }),
        retrieveCart: builder.mutation({
            query: (cartId) => (console.log("cartId @@@",cartId),{
                url: 'retrieveCart',
                method: 'POST',
                body: cartId
            }),
        }),
        updateExistingCart: builder.mutation({
            query: (cartupdatedata) => (console.log("cartupdatedata @@@",cartupdatedata),{
                url: 'updateexistingcart',
                method: 'POST',
                body: cartupdatedata
            }),
        }),
        romoveItemfromCart: builder.mutation({
            query: (removeItemdata) => (console.log("Remove Item from cart ###",removeItemdata),{
                url: 'removeitemfromcart',
                method: 'POST',
                body: removeItemdata
            }),
        }),
        updateExistingItemInCart: builder.mutation({
            query: (cartItemupdatedata) => (console.log("update Existing Cart Item Toolkit response ===>",cartItemupdatedata),{
                url: 'updateexistingitemincart',
                method: 'POST',
                body: cartItemupdatedata
            }),
        }),
    }),
});

export const { useCartCreateMutation , useRetrieveCartMutation, useUpdateExistingCartMutation, useRomoveItemfromCartMutation, useUpdateExistingItemInCartMutation} = cartPageService;
export default cartPageService;
