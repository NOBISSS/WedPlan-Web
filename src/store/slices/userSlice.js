import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        user:null,
        loading:false,
        error:false,
    },
    
});

export const {}=userSlice.actions;

export default userSlice.reducer;