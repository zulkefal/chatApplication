import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import messageSlice from "./Slices/messageSlice";
import socketSlice from "./Slices/socketSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        message: messageSlice,
        socket: socketSlice
    }
});

export default store;
