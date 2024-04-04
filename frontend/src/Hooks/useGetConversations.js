import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

// Custom hook for fetching conversations
const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  // Define getConversations outside useEffect to make it accessible for manual refresh
  const getConversations = async () => {
      setLoading(true);
      try {
          const res = await fetch(`/api/users`);
          const data = await res.json();
          
          if (data.error) throw new Error(data.error);
          setConversations(data);
          console.log('getConversation function:', data)
      } catch (error) {
          toast.error(error.message); // Show error message on failure
      } finally {
          setLoading(false); // Hide loading indicator
      }
  };

    useEffect(() => {
      getConversations(); // Execute the fetch operation on component mount
    }, []); // Empty dependency array means this runs once on mount

  return { loading, conversations, getConversations }; // Expose getConversations for manual refresh
}

export default useGetConversations