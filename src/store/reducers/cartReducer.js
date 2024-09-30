import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
    name: 'cartReducer',
    initialState: {
        baskitCounter : 0
    },
    reducers: {
        
        setBaskitCounterValue: (state, action) => {
            console.log("Cart Reducer chla ", action.payload)
            state.baskitCounter = action.payload 
        }
      
    }
})
export const {  setBaskitCounterValue } = cartReducer.actions;
export default cartReducer.reducer;