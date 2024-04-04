import React, { useMemo } from 'react';
import Conversation from './Conversation.jsx';
import useGetConversations from '../../Hooks/useGetConversations.js';
import useConversation from '../../zustand/useConversation.js';

const Conversations = () => {
  const { loading, conversations: permanentConversations } = useGetConversations();
  const { temporaryConversations } = useConversation();

  // Combine permanent and temporary conversations with a useMemo hook for efficiency.
  const conversations = useMemo(() => {
    // Ensure temporary conversations are marked as such.
    const markedTemporaryConversations = temporaryConversations.map(convo => ({
      ...convo,
      isTemporary: true
    }));
    // Combine the conversations and return them.
    return [...permanentConversations, ...markedTemporaryConversations];
  }, [permanentConversations, temporaryConversations]);

  if (loading) {
    return <span className='loading loading-spinner mx-auto'></span>;
  }

  if (conversations.length === 0) {
    return <div className='py-2'>No conversations to display.</div>;
  }

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id || `temp-${idx}`} // Use a unique key for each conversation.
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
    </div>
  );
};

export default Conversations;