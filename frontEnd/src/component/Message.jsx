import React, { Children, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { MdOutlineFileDownload } from "react-icons/md";

import './Message.css'

const Message = ({ message }) => {
  const scroll = useRef();
  const { selectedUser } = useSelector((state) => state.user);
  const { authUsers } = useSelector((store) => store.user);

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);
  const handleDownload = () => {
    const fileUrl = `http://localhost:8000/uploads/${message.file.split('\\').pop()}`;
    window.open(fileUrl, '_blank', 'noopener,noreferrer');  };
  return (
    <div
      ref={scroll}
      className={`chat ${
        authUsers?._id === message?.senderID ? "chat-end" : "chat-start "
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Avatar"
            src={
              authUsers?._id === message?.senderID
                ? authUsers.profilePhoto
                : selectedUser.profilePhoto
            }
          />
        </div>
      </div>
     
     
     
      <div>
   
      <div>
    <div className="chat-header"></div>
    <div
      className={`chat-bubble ${
        authUsers?._id === message?.senderID ? "bg-gray-200 text-black" : ""
      }`}
    >
      {message?.message && (
        <span>{message.message}</span>
      )}
      {message?.file && (
       <div className="flex">
         <a  
          className="file-link" 
        >
          {message.file.split('\\').pop()} 
        </a>
        <MdOutlineFileDownload
            className="text-white text-3xl mt-5"
            onClick={handleDownload} 
          />
       </div>
      )}
    </div>
  </div>
  </div>
    </div>
  );
};

export default Message;
