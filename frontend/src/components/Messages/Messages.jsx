import React from 'react'
import Message from './Message'
import useGetMessages from '../../Hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import { useEffect } from 'react'
import { useRef } from 'react'
import useListenMessages from '../../Hooks/useListenMessages'

const Messages = () => {

  const { messages, loading } = useGetMessages()
  useListenMessages() // this will listen for any incoming messages from socket
  const lastMessageRef = useRef()

  console.log('messags:', messages) 

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>

      {/* loading states  */}

      { !loading &&
        messages.length > 0 && 
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

       {loading && [...Array(3)].map((_,idx) => <MessageSkeleton key={idx} />)}

       { !loading && messages.length === 0 && (
        <p className='text-center'>Send a messages to start a conversation</p>
       )}

      
    </div>
  )
}

export default Messages
