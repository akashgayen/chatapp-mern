import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";

function Conversations() {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="flex flex-col px-2 overflow-auto">
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        conversations.map((conversation, idx) => {
          return (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              lastidx={idx === conversations.length - 1}
            />
          );
        })
      )}
    </div>
  );
}

export default Conversations;
