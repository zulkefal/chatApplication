import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/Slices/userSlice";

const MessageContainer = () => {
  const {selectedUser} = useSelector(state=>state.user);
  const dispatch = useDispatch();
  useEffect(()=>{

    return ()=> dispatch(setSelectedUser(null))

  },[])

  return (
      <>
      {
        selectedUser === null ?<div className="md:min-w-[450px] flex flex-col justify-center items-center">
           <h1 className="text-2xl text-white">Hello Start Conversation</h1>
        </div> :<div className="w-full md:min-w-[450px] flex flex-col">
        <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2">
          <div className="avatar online">
            <div className="w-12 rounded-full">
              {" "}
              <img
                src={selectedUser?.profilePhoto}
                alt="user-profile"
              />
            </div>
          </div>
          <div className="">
            <div className="flex justify-between gap-2">
              <p className="text-white">{selectedUser?.fullName}</p>
            </div>
          </div>
        </div>
        <Messages/>
        <SendInput/>
      </div>
      }
      </>
  );
};

export default MessageContainer;
