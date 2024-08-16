import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";

const SendInput = () => {
  const [message,setMessage] = useState('');

  const onSubmitHandler = (e)=>{
    e.preventDefault();
    alert(message);
    setMessage('');
  }
  return (
    <form onSubmit={onSubmitHandler} className='px-4 my-3'>
      <div className='w-full relative'>
        <input type="text" placeholder='Send a Message..' 
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        className='border text-sm p-3 border-zinc-500 rounded-lg block w-full bg-gray-600 text-white'/>
        <button type='submit' className='absolute flex inset-y-0 end-0 items-center pr-4 hover:text-white'><IoSend/></button>
      </div>
    </form>
  )
}

export default SendInput
