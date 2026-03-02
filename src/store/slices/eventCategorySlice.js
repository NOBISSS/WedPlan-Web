import { createSlice } from "@reduxjs/toolkit";

import { fetchCategory } from "../thunks/eventCategoryThunk";


const eventCategorySlice = createSlice({
    name: "eventCategory",
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCategory.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        })
        .addCase(fetchCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})


export const {} = eventCategorySlice.actions;

export default eventCategorySlice.reducer;