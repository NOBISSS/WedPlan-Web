import { createAsyncThunk } from "@reduxjs/toolkit";

import {BASE_URL, headers } from "@/constants/constant";
import axios from "axios";

export const fetchEvents = createAsyncThunk(
    "event/fetchEvents",
    async (_, { rejectWithValue }) => {
        try{
            const res = await axios.get(`${BASE_URL}/event/getmy`, headers(localStorage.getItem("token")));
            return res.data.data.events;
        }catch(error){
                return rejectWithValue(error.response.data.message || "Failed to fetch events");
        }
    });
