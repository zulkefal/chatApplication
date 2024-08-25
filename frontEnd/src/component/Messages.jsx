import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import useGetRealTimeMessages from "../hooks/useGetRealTimeMessages";

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessages();

    const { messages } = useSelector(store => store.message);


    return (
        <div className='px-4 flex-1 overflow-auto'>
            {
               messages && messages?.map((message) => {
                    return (
                        <Message key={message._id} message={message} />
                    )
                })
            }

        </div>
    );
};

export default Messages;
