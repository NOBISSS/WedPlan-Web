import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import eventCategoryReducer from "./slices/eventCategorySlice";
import venueReducer from "./slices/venueSlice";
import guestReducer from "./slices/guestSlice";

const store=configureStore({
    reducer:{
        auth:authReducer,
        eventCategory:eventCategoryReducer,
        venue:venueReducer,
        guest:guestReducer
    },
});

export default store;