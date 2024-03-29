import React from 'react'
import { FiSend } from "react-icons/fi";


const MessageInput = () => {
  return (
    <form className='px-4 my-3 relative'>
            <div className='w-full'>
                <input 
                    type="text"
                    className='border text-sm rounded-full block w-full p-3'
                    
                />
                <button type='submit' className='absolute inset-y-0 right-0 flex items-center pr-5 mr-5'>
                    <FiSend />
                </button>
            </div> 
        </form>
  ) 
}

export default MessageInput
 