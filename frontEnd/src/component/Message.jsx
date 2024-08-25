import React, { Children, useEffect, useRef } from "react";
import { useSelector } from "react-redux";


const Message = ({ message }) => {

  const scroll = useRef();
  const { selectedUser } = useSelector(state => state.user);
  const {authUsers}= useSelector(store=>store.user);
  console.log('selected',selectedUser)
  console.log('auth',authUsers)




  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message]); 

  return (
    <div ref={scroll} className={`chat ${authUsers?._id === message?.senderID ? 'chat-end' : 'chat-start '}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Avatar"
            src={authUsers?._id === message?.senderID ? authUsers.profilePhoto : selectedUser.profilePhoto}
          />
        </div>
      </div>
      <div className="chat-header">
      </div>
      <div className={` chat-bubble ${authUsers?._id === message?.senderID ? 'bg-gray-200 text-black' : ''}`}>{message?.message}</div>
    </div>
  );
};

export default Message;
