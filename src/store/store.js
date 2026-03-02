import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import eventCategoryReducer from "./slices/eventCategorySlice";
const store=configureStore({
    reducer:{
        auth:authReducer,
        eventCategory:eventCategoryReducer
    },
});

export default store;