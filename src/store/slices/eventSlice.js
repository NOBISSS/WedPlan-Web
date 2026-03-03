import { categories } from "@/constants/constant";
import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents } from "../thunks/eventThunk";

const initialState = {
    eventCategory: null,
    events: [],
    subEvents:[],
    completedEvents:[],
    nonCompletedEvents:[],
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
                console.log("LOADING FALSE DONE",action.payload);
                state.loading = false;
                state.events = action.payload;
                console.log(action.payload);
                state.completedEvents = action.payload.filter(event => event.isActive);
                state.nonCompletedEvents = action.payload.filter(event => !event.isActive);
                state.subEvents = action.payload.flatMap(event => event.subEvents || []);
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