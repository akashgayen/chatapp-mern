import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const { messages, setMessages, selectedConversation, skip, setSkip, setHasMore } = useConversation();
    const messagesLimit = import.meta.env.VITE_MESSAGES_LIMIT || 50;
    
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}?limit=${messagesLimit}&skip=0`);
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setMessages(data.messages);
                setSkip(messagesLimit);
                setHasMore(data.hasMore);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        if (selectedConversation?._id) {
            getMessages();
        }
    }, [selectedConversation?._id, setMessages, setSkip, setHasMore, messagesLimit]);

    const loadMoreMessages = async () => {
        if (loadingMore) return;
        setLoadingMore(true);
        try {
            const res = await fetch(`/api/messages/${selectedConversation._id}?limit=${messagesLimit}&skip=${skip}`);
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            const { prependMessages } = useConversation.getState();
            prependMessages(data.messages);
            setSkip(skip + messagesLimit);
            setHasMore(data.hasMore);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoadingMore(false);
        }
    }

    return { loading, loadingMore, messages, loadMoreMessages };
}

export default useGetMessages