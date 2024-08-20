import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";


const Message = ({ message }) => {

  const scroll = useRef();
  const { selectedUser } = useSelector(state => state.user);
  const {authUser}= useSelector(store=>store.user);
  const storedUser = localStorage.getItem('authUser');
  const user = JSON.parse(storedUser);


  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
      // console.log("authUser",user?._id);
      // console.log("message?.senderId",message);
    }
  }, [message]); 

  return (
    <div ref={scroll} className={`chat ${user?._id === message?.senderID ? 'chat-end' : 'chat-start '}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Avatar"
            src={message?.senderId === authUser?._id ? selectedUser?.profilePhoto : message?.profilePhoto}
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-500 text-white">12:45</time>
      </div>
      <div className={` chat-bubble ${user?._id === message?.senderID ? 'bg-gray-200 text-black' : ''}`}>{message?.message}</div>
    </div>
  );
};

export default Message;
