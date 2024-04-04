import { FiSend } from "react-icons/fi";
import useSendMessage from '../../Hooks/useSendMessage';
import { useState } from 'react';


const MessageInput = () => {

    const [message, setMessage] = useState("")
    const { loading, sendMessage} = useSendMessage()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!message) return;

        await sendMessage(message);
        setMessage('');

    }
    
  return (
    <form className='px-4 my-3 relative' onSubmit={handleSubmit}>
            <div className='w-full'>
                <input 
                    type="text"
                    className='border text-sm rounded-full block w-full p-3'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    
                />
                <button type='submit' className='absolute inset-y-0 right-0 flex items-center pr-5 mr-5'>
                    {loading ? <div className='loading loading-spinner'></div> : <FiSend />}
                    
                </button>
            </div> 
        </form>
  ) 
}

export default MessageInput
 