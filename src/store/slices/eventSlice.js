import { categories } from "@/constants/constant";
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    eventCategory:null,
};

const eventSlice=createSlice({
    name:"event",
    initialState,
    reducers:{
        addEventCategory:(state,action)=>{
            if(categories.includes(action.payload)){
                state.eventCategory=action.payload;
            }
        }
    }
})


export const {}=eventSlice.reducer;

export default eventSlice.actions;