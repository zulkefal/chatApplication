import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { selectedUser } = useSelector(state => state.user);

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message]); 

  return (
    <div ref={scroll} className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Avatar"
            src={selectedUser?.profilePhoto}
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-500 text-white">12:45</time>
      </div>
      <div className="chat-bubble">{message?.message}</div>
    </div>
  );
};

export default Message;
