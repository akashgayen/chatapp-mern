import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { CiMenuBurger } from "react-icons/ci";

function MessageContainer({ toggleSidebar, isMobile }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="md:min-w-[450px] flex flex-col h-full">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2 flex items-center h-16 gap-4">
            {isMobile && (
              <button onClick={toggleSidebar} className="text-white">
                <CiMenuBurger size={24} />
              </button>
            )}
            <span className="label-text text-white">To:</span>{" "}
            <span className="text-white font-bold">{selectedConversation.fullName}</span>
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
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
