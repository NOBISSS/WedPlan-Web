import { BASE_URL, headers } from "@/constants/constant";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGuests = createAsyncThunk(
    "guest/fetchGuests",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${BASE_URL}/guest/list`, headers(localStorage.getItem("token")));
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to fetch guests");
        }
    });

export const addGuest = createAsyncThunk(
    "guest/addGuest",
    async (guestData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${BASE_URL}/guest/addcustom`, guestData, headers(localStorage.getItem("token")));
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to add guest");
        }
    });
