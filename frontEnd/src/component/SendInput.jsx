import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import {useDispatch} from 'react-redux'

const SendInput = () => {
  const [message,setMessage] = useState('');

   const dispatch = useDispatch();

  const onSubmitHandler = async (e)=>{
    e.preventDefault();

    try {
      const send = await fetch("http://localhost:8000/api/message/send/66bedcdbc8390d357e9fd08a",{
        method:'POST',
        credentials:true
      })
    } catch (error) {
      console.log("error in sending message",error)
    }
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
