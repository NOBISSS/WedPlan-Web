import { createSlice } from "@reduxjs/toolkit";

const guestSlice=createSlice({
    name:'guest',
    initialState:{
        guests:[],
        error:null,
        loading:false
    },
    extraReducers:(builder)=>{
        builder
            .addCase("guest/fetchGuests/pending",(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase("guest/fetchGuests/fulfilled",(state,action)=>{
                state.loading=false;
                state.guests=action.payload;
            })
            .addCase("guest/fetchGuests/rejected",(state,action)=>{
                state.loading=false;
                state.error=action.error.message;
            })
    },
    reducers:{

    }
})

export const {}=guestSlice.actions;

export default guestSlice.reducer;