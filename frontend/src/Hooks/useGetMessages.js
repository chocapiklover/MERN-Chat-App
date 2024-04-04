import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useConversation from '../zustand/useConversation'

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`);
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setMessages(data); // Assuming you want to set the fetched messages here
            } catch (error) {
                toast.error(error.message);   
            } finally {
                setLoading(false);
            }
        };


        //if there is a selected conversation, then call the get messages function
        if (selectedConversation?._id) getMessages()
      
        //dependancy array. so if there are channges in this array the useEffect runs again
    },[selectedConversation?._id, setMessages]); 
    return { messages, loading };
};
export default useGetMessages;
