import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="md:min-w-[850px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="flex items-center bg-slate-500 px-4 h-16 py-2 mb-2">
            <span className="label-text text-lg">To: </span>

            <span className="text-gray-900 font-bold text-lg ml-1">
              {selectedConversation.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}

export default MessageContainer;

const NoChatSelected = () => {
  const {authUser} = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md: text-xl text-grey-200 font-semibold flex flex-col items-center gap-2">
        <h1>Welcome {authUser.fullName} </h1>
        <h1>Select a chat to start messaging</h1>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
