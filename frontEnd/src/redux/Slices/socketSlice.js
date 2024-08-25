import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name: "socket",
    initialState: {
        isConnected: false,
        socket: null, 
    },
    reducers: {
        setConnectionStatus: (state, action) => {
            state.isConnected = action.payload;
        },
        setSocket: (state, action) => {
            state.socket = action.payload;
        },
    },
});

export const { setConnectionStatus, setSocket } = socketSlice.actions;
export default socketSlice.reducer;