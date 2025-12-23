import { create } from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],   
    setMessages: (messages) => set({ messages }),
    prependMessages: (newMessages) => set((state) => ({ messages: [...newMessages, ...state.messages] })),
    skip: 0,
    setSkip: (skip) => set({ skip }),
    hasMore: true,
    setHasMore: (hasMore) => set({ hasMore }),
}));

export default useConversation;