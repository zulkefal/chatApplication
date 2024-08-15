import React from 'react'
import { IoSend } from "react-icons/io5";

const SendInput = () => {
  return (
    <form className='px-4 my-3'>
      <div className='w-full relative'>
        <input type="text" placeholder='Send a Message..' className='border text-sm p-3 border-zinc-500 rounded-lg block w-full bg-gray-600 text-white'/>
        <button className='absolute flex inset-y-0 end-0 items-center pr-4 hover:text-white'><IoSend/></button>
      </div>
    </form>
  )
}

export default SendInput
