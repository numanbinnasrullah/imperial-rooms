import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const checkoutService = createApi({
    reducerPath: 'checkout',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/',
    }),
    endpoints: (builder) => ({
        cartCheckout: builder.mutation({
            query: (checkoutId) => (console.log("Checkout Service",checkoutId),{
                url: 'checkout',
                method: 'POST',
                body: checkoutId
            }),
        })
       
    }),
});

export const { useCartCheckoutMutation } = checkoutService;
export default checkoutService;
