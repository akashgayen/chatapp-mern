import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useEffect, useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from "../../zustand/useConversation";

function Messages() {
  const { messages, loading, loadingMore, loadMoreMessages } = useGetMessages();
  const { hasMore, selectedConversation } = useConversation();
  const lastMessageRef = useRef();
  const messagesEndRef = useRef();
  const messageContainerRef = useRef();
  const previousScrollHeight = useRef(0);
  const isInitialLoad = useRef(true);

  useListenMessages();

  // Reset initial load flag when conversation changes
  useEffect(() => {
    isInitialLoad.current = true;
  }, [selectedConversation?._id]);

  // Scroll to bottom only on initial load
  useEffect(() => {
    if (isInitialLoad.current && messages.length > 0 && !loading) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        isInitialLoad.current = false;
      }, 200);
    }
  }, [messages, loading]);

  // Handle scroll for lazy loading
  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop < 50 && hasMore && !loading && !loadingMore) {
        previousScrollHeight.current = container.scrollHeight;
        loadMoreMessages();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, loadingMore, loadMoreMessages]);

  // Maintain scroll position when new messages are loaded
  useEffect(() => {
    const container = messageContainerRef.current;
    if (container && previousScrollHeight.current > 0) {
      const newScrollHeight = container.scrollHeight;
      const scrollDifference = newScrollHeight - previousScrollHeight.current;
      container.scrollTop += scrollDifference;
    }
  }, [messages.length]);

  return (
    <div 
      ref={messageContainerRef}
      className="px-4 flex-1 overflow-auto"
    >
      {loadingMore && [...Array(3)].map((_, idx) => <MessageSkeleton key={`top-${idx}`} />)}
      
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      
      <div ref={messagesEndRef} />
      
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation!</p>
      )}
      
      {loading && [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)}
    </div>
  );
}

export default Messages;
