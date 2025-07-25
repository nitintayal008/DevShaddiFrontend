import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers:{
        addFeed: (state, action)=>{
            return action.payload;
        },
        removeFeed: (state, action)=>{
            console.log("i am inside remove feed")
            const newFeed = state.filter(f=>f._id !== action.payload);
            return newFeed;
        }
    }
})

export const {addFeed, removeFeed} = feedSlice.actions;
export default feedSlice.reducer;
