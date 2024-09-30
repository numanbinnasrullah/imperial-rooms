import {configureStore} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import homePageService from "./services/homePageService";
import collectionService from "./services/collectionPageService";
// import cartPageService from "./services/cartService";
import cartReducer from "./reducers/cartReducer";
// import filtersService from "./services/filterService";
// import collectionService from "./services/collectionService";
import checkoutService from "./services/checkoutService";
// import blogService from "./services/blogService";
// import authService  from "./services/authService";
// import authReducer from "./reducers/authReducer";
// import productService from "./services/productService";


const Store = configureStore({
    reducer: {
        [homePageService.reducerPath]: homePageService.reducer,
        [collectionService.reducerPath]: collectionService.reducer,
        // [cartPageService.reducerPath]: cartPageService.reducer,
        // [filtersService.reducerPath]: filtersService.reducer,
        // [collectionService.reducerPath]: collectionService.reducer,
        [checkoutService.reducerPath]: checkoutService.reducer,
        // [blogService.reducerPath]: blogService.reducer,

        "cartReducer": cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(homePageService.middleware , collectionService.middleware),
},
);
setupListeners(Store.dispatch);
export default Store;