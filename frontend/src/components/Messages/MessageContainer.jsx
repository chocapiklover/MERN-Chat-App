import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from 'react-icons/ti';
import useConversation from '../../zustand/useConversation';
import { useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { addUserToContacts } from '../services/apiService';
import toast from 'react-hot-toast'
import  useGetConversations   from '../../Hooks/useGetConversations';


const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation, removeTemporaryConversation  } = useConversation();
    const { authUser } = useAuthContext();
    const { getConversations } = useGetConversations();
    

    //reset the selected user on mount
    useEffect(() => {
        return () => setSelectedConversation(null)
    },[setSelectedConversation]);

     // Handler to add temporary conversation to permanent contacts
     
    const handleAddToContacts = async () => {
        if (selectedConversation && selectedConversation._id) {
            try {
                
                removeTemporaryConversation(selectedConversation._id);
                setSelectedConversation(null);
                await getConversations(); // This should internally set loading to true, then false once done
                await addUserToContacts(selectedConversation._id);
                // Assuming getConversations will manage the loading state
                
                toast.success('Contact added successfully.');
            } catch (error) {
                console.error('Failed to add user to contacts:', error);
                toast.error('Failed to add user to contacts.');
            }
        }
    };



    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : selectedConversation.isTemporary ? (
                // Render this when the selected conversation is marked as temporary
                <div className="flex flex-col items-center justify-center flex-1">
                    <p>{selectedConversation.fullName} is not in your contacts.</p>
                    <button onClick={handleAddToContacts} className="btn btn-primary">
                        Add to Contacts
                    </button>
                </div>
            ) : (
                // Render the regular message view for non-temporary conversations
                <>
                    <div className='px-4 py-2 mb-2'>
                        <span className='font-bold'>{selectedConversation.fullName}</span>
                    </div>
                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};

export default MessageContainer;

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl font-semibold flex flex-col items-center gap-3'>
                <p>Welcome, {authUser.fullName}</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center'/>
            </div>
        </div>
    );
};