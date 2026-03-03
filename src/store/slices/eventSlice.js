import { categories } from "@/constants/constant";
import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents } from "../thunks/eventThunk";

const initialState = {
    eventCategory: null,
    events: [],
    selectedEvents: [],
    loading: false,
    error: null
};

const eventSlice = createSlice({
    name: "event",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
    reducers: {
        addEventCategory: (state, action) => {
            if (categories.includes(action.payload)) {
                state.eventCategory = action.payload;
            }
        },
        toggleSelectedEvent: (state, action) => {   // ✅ add this
            const id = action.payload;
            if (state.selectedEvents.includes(id)) {
                state.selectedEvents = state.selectedEvents.filter((e) => e !== id);
            } else {
                state.selectedEvents.push(id);
            }
        },
    }
})


export const { addEventCategory, toggleSelectedEvent } = eventSlice.actions;

export default eventSlice.reducer;