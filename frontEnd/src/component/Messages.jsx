import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";

const Messages = () => {
    useGetMessages();

    const { messages } = useSelector(store => store.message);

    if (!messages || messages.length === 0) {
        return <p className="text-center text-white">No messages found</p>;
    }

    return (
        <div className="px-4 flex-1 overflow-auto">
            {messages.map(message => (
                <Message key={message._id} message={message} />
            ))}
        </div>
    );
};

export default Messages;
