import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/Slices/messageSlice"

const useGetRealTimeMessages = () => {
    const dispatch = useDispatch()
    const {socket} = useSelector(store=>store.socket)
    const {messages} = useSelector(store=>store.message)
 
  
    useEffect(()=>{
        socket?.on('newMessage',(newMsg)=>{
            dispatch(setMessages([...messages,newMsg]))
        })

    },[socket,setMessages,messages])
}

export default useGetRealTimeMessages
