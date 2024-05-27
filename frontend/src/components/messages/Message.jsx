import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromSender = message.senderId === authUser._id;
  const className = fromSender ? "chat-end" : "chat-start";
  const profilePic = fromSender
    ? authUser.profilePic
    : selectedConversation.profilePic;
  const backgroundColor = fromSender ? "bg-blue-500" : "";
  const messageTime = message.createdAt;
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${className}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="Image tag" />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${backgroundColor} ${shakeClass}`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center pb-2">
        {extractTime(messageTime)}
      </div>
    </div>
  );
}

export default Message;
