import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import messageSlice from "./Slices/messageSlice";
const store = configureStore({
    reducer: {
        user: userSlice,
        message: messageSlice
    }
});

export default store;
