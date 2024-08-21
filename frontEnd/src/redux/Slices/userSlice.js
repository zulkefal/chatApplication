import { createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
    name: 'user',
    initialState:{
        authUsers:[],
        otherUsers:[],
        selectedUser:[],
        onlineUsers:[]
    },
    reducers:{
        setAuthUsers:(state,action)=>{
            state.authUsers = action.payload
        },
        setOtherUsers:(state,action)=>{
            state.otherUsers = action.payload
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser = action.payload
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload
        }
    }
})

export const {setAuthUsers,setOtherUsers,setSelectedUser,setOnlineUsers} = userSlice.actions;

export default userSlice.reducer;