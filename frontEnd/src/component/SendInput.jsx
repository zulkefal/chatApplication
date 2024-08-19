import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import {useDispatch, useSelector} from 'react-redux'
import { setMessages } from '../redux/Slices/messageSlice';


const SendInput = () => {
  const [message, setMessage] = useState('');
  const { selectedUser } = useSelector(state => state.user);
  const { messages } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/message/send/${selectedUser?._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setMessages([...messages, data.newMessage]));
      } else {
        console.log("Failed to send message:", response.statusText);
      }
    } catch (error) {
      console.log("Error in sending message:", error);
    }

    setMessage('');
  };

  return (
    <form onSubmit={onSubmitHandler} className='px-4 my-3'>
      <div className='w-full relative'>
        <input
          type="text"
          placeholder='Send a Message..'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='border text-sm p-3 border-zinc-500 rounded-lg block w-full bg-gray-600 text-white'
        />
        <button
          type='submit'
          className='absolute flex inset-y-0 end-0 items-center pr-4 hover:text-white'>
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
