import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/Slices/messageSlice';

const useGetMessages = () => {
    const {selectedUser}= useSelector(store=>store.user)
    const dispatch= useDispatch();
    if (selectedUser)
    {
        useEffect(()=>{
            const fetchMessages= async ()=>{
             try {
                 const response = await fetch (`http://localhost:8000/api/message/${selectedUser?._id}`,{
                     method:'GET',
                     credentials:'include'
                 })
         
                 const data = await response.json()
                 if(data)
                 {   
                     dispatch(setMessages(data.messages));
         
                 }
                 if(!data)
                 {
                     console.log('No Conversation',error)
         
                 }
                 
             } catch (error) {
                 console.log('erro in fetch message',error)
             }
            }
            fetchMessages();
          },[selectedUser?._id,setMessages])
    }
}

export default useGetMessages
