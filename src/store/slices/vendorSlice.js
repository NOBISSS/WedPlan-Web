import { createSlice } from "@reduxjs/toolkit";
import { setVendorProfile } from "../thunks/authThunks";

const vendorSlice= createSlice({
    name:"vendor",
    initialState:{
        user:null,
        vendor:null,
        vendorProfile:null,
        vendorMedia:null,
        vendorService:null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(setVendorProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.user=null;
            state.vendor=null;
            state.vendorProfile =null
            state.vendorService = null;
            state.vendorMedia = null;
        })
        .addCase(setVendorProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user=action.payload.user;
            state.vendor=action.payload.vendor;
            state.vendorProfile = action.payload.vendorProfile;
            state.vendorService = action.payload.vendorService;
            state.vendorMedia = action.payload.vendorMedia;
        })
        .addCase(setVendorProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to set vendor profile";
        })
    }
});