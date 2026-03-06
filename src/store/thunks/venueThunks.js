import { BASE_URL, headers } from "@/constants/constant";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVenues = createAsyncThunk(
    "venue/fetchVenues",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${BASE_URL}/venue/getall`, headers(null));
            return res.data.data.venues;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to fetch venues");
        }
    });

export const fetchSelectedVenue = createAsyncThunk(
    "venue/fetchSelectedVenue",
    async (venueId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${BASE_URL}/venue/getdetails/${venueId}`, headers(token));
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to fetch venues");
        }
    });