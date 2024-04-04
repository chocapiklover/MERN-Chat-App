import { create } from 'zustand'


const useConversation = create((set) => ({
    
    
    selectedConversation: null, // Holds the currently selected conversation
    messages: [], // Holds messages for the selected conversation
    temporaryConversations: [], // Holds temporary conversations

    // Sets the selected conversation
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

    // Sets messages for the current conversation
    setMessages: (messages) => set({ messages }),

    // Adds a new temporary conversation if it doesn't already exist
    addTemporaryConversation: (newConversation) => set((state) => {
        const exists = state.temporaryConversations.some(convo => convo._id === newConversation._id);
        if (!exists) {
            return { ...state, temporaryConversations: [...state.temporaryConversations, { ...newConversation, isTemporary: true }] };
        }
        return state;
    }),

    // Removes a specified temporary conversation
    removeTemporaryConversation: (conversationId) => set((state) => ({
        temporaryConversations: state.temporaryConversations.filter(convo => convo._id !== conversationId),
        
    })),

    // Clears all temporary conversations
    clearTemporaryConversations: () => set({ temporaryConversations: [] }),
}));

export default useConversation;