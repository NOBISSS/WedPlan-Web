import { BASE_URL, headers } from "@/constants/constant";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const RegisterUser = createAsyncThunk(
    "user/RegisterUser",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${BASE_URL}/guest/list`, headers(localStorage.getItem("token")));
            console.log("Guests fetched:", res.data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to fetch guests");
        }
    });