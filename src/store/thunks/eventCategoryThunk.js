import { BASE_URL, headers } from "@/constants/constant";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategory = createAsyncThunk(
    "eventCategory/fetchCategory",
    async (_, { rejectWithValue }) => {
        try{
            const res = await axios.get(`${BASE_URL}/eventcategory`, headers(null));
            console.log("Categories fetched:", res.data);
            return res.data;
        }catch(error){
            return rejectWithValue(error.response.data.message || "Failed to fetch categories");
        }
});
