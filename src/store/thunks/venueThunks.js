import { BASE_URL } from "@/constants/constant";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVenues = createAsyncThunk(
    "venue/fetchVenues",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${BASE_URL}/venue/getall`);
            console.log(res.data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to fetch venues");
        }
    });