import React from 'react'
import { MdOutlinePersonSearch } from "react-icons/md";
import useConversation from '../../zustand/useConversation' //Zustand store 
import useGetConversation from '../../Hooks/useGetConversations'
import toast from 'react-hot-toast'
import { useState } from 'react';


const SearchInput = () => {
  const [search, setSearch] = useState('')
  const { setSelectedConversation, addTemporaryConversation } = useConversation() //
  const { conversations } = useGetConversation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3 ){
      return toast.error('Search must be at least 3 characters')
    }

    const conversation = conversations.find((c) => c.username.toLowerCase().includes(search.toLowerCase()));

    if (conversation){
      setSelectedConversation(conversation);
      setSearch('');
    } else {

       // Search for the user using the backend endpoint
       try {
        const response = await fetch(`/api/users/search?username=${encodeURIComponent(search)}`);
        const users = await response.json();
        if (users.length > 0) {
            // Assuming you want to add the first user found to the temporary conversation list
            const user = users[0];
            addTemporaryConversation(user); // Utilize addTemporaryConversation from the store
            toast.success('User added to temporary conversations.');
        } else {
            toast.error('No such user found');
        }
    } catch (error) {
        console.error('Search error:', error);
        toast.error('Failed to search for user');
    }
    setSearch('');
    }
  }; 

  return (
    <form className='flex items-center' onSubmit={handleSubmit}>
        <input 
        type='text' 
        placeholder='Search' 
        className='input input-bordered rounded-full mt-2 m-4'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-primary rounded-full mt-2 m-4'>
        <MdOutlinePersonSearch className='w-8 h-8'/>
        </button>

    </form>
  )
}

export default SearchInput