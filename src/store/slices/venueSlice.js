import { createSlice } from "@reduxjs/toolkit";
import { fetchVenues,fetchSelectedVenue } from "../thunks/venueThunks";

const venueSlice=createSlice({
    name:'venue',
    initialState:{
        venues:[],
        currentSelectedVenue:null,
        error:null,
        loading:false
    },
    extraReducers:(builder)=>{

        builder
        .addCase(fetchVenues.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchVenues.fulfilled,(state,action)=>{
            state.loading=false;
            state.venues=action.payload;
        })
        .addCase(fetchVenues.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
        builder
        .addCase(fetchSelectedVenue.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchSelectedVenue.fulfilled,(state,action)=>{
            state.loading=false;
            state.currentSelectedVenue=action.payload;
        })
        .addCase(fetchSelectedVenue.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })    
    },
    reducers:{
        addCurrentSelectedVenue:(state,action)=>{
            state.currentSelectedVenue=action.payload
        },
}
});

export const {addCurrentSelectedVenue}=venueSlice.actions;

export default venueSlice.reducer;