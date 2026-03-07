import { BASE_URL, headers } from "@/constants/constant";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setVendorProfileThunk=createAsyncThunk(
    "auth/setVendorProfile",
    async (profileData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(`${BASE_URL}/vendor/setprofile`, profileData, headers(token));
            return res.data.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to set vendor profile");
        }
    }
);

