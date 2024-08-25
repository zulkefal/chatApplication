import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/Slices/messageSlice";
import { FaPaperclip } from "react-icons/fa";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const { selectedUser } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('message', message);
    if (file) {
      formData.append('file', file);
    }
    try {
      const response = await fetch(
        `http://localhost:8000/api/message/send/${selectedUser?._id}`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(setMessages([...messages, data.newMessage]));
        setMessage(""); 
        setFile(null);
      } else {
        const errorData = await response.json();
        console.log("Failed to send message:", errorData.message);
      }
    } catch (error) {
      console.log("Error in sending message:", error);
    }

    setMessage("");
  };

  return (
    <form onSubmit={onSubmitHandler} className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Send a Message.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border text-sm p-3 border-zinc-500 rounded-lg block w-full bg-gray-600 text-white"
        />
        <label
          htmlFor="file-input"
          className="absolute flex inset-y-0 end-5 items-center pr-2 hover:text-white"
        >
          <FaPaperclip style={{ cursor: "pointer", fontSize: "20px" }} />
        </label>
        <input
          type="file"
          id="file-input"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          type="submit"
          className="absolute flex inset-y-0 end-2 items-center pr- hover:text-white"
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
