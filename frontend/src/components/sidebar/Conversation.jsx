import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

function Conversation({ conversation, lastidx }) {
  const { profilePic, fullName } = conversation;
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  return (
    <>
      <div
        className={`flex gap-3.5 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={profilePic} alt="Profile picture" loading="lazy" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <h1 className="font-bold text-gray-200">{fullName}</h1>
        </div>
      </div>
      {!lastidx && <div className="divider m-0 py-0"></div>}
    </>
  );
}

export default Conversation;