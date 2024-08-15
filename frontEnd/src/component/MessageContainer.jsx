import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";

const MessageContainer = () => {
  return (
      <div className="w-full md:min-w-[450px] flex flex-col">
        <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2">
          <div className="avatar online">
            <div className="w-12 rounded-full">
              {" "}
              <img
                src="https://imgs.search.brave.com/ZlMA1xyb5O_WINlJ1KTJPjXirJamlkRY4vG4wWqequQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvY29vbC1wcm9m/aWxlLXBpY3R1cmUt/ODdoNDZnY29iamw1/ZTR4dS5qcGc"
                alt="user-profile"
              />
            </div>
          </div>
          <div className="">
            <div className="flex justify-between gap-2">
              <p className="text-white">Zulkefal Khan</p>
            </div>
          </div>
        </div>
        <Messages/>
        <SendInput/>
      </div>
  );
};

export default MessageContainer;
