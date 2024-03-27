
import Conversation from '../models/conversations.models.js'
import Message from '../models/message.models.js'

// The sendMessage async function to handle message sending.
export const sendMessage = async (req, res) => {
    
    try {
        const { message } = req.body; // getting message from user 
        const { id: receiverId } = req.params;  // Extracting the receiver's ID from the request parameters.
        const senderId = req.user._id  //current senderid/current authenticated user from the middleware

        // find the conversation between the users
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId]},
        })

        // if the conversation does not exist or is a new conversation
        if (!conversation) {
            conversation = await Conversation.create({ 
                participants: [senderId, receiverId]  
            })
        }

        // for new messages
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        // If the newMessage document is successfully created,
        // push the new message's ID into the conversation's messages array.
        if (newMessage) {
            conversation.messages.push(newMessage._id); // adding/pushing new message_id into the array of conversation
        }

        //SOCKET.IO FUNCTIONALITY WILL GO HERE
        
        // Save both the updated conversation and the new message concurrently/in parallelk
        await Promise.all([conversation.save(), newMessage.save(),])

        res.status(201).json(newMessage)

        console.log('message sent!', req.params.id) 

    } catch (error) {
        console.log('error in sendMessage controller',error.message)
        res.status(500).json({error: "internal server error" });         
    }
} 

export const getMessages = async (req, res) =>{

    try {
        //extracts id from who the current user wants to chat with, asigns to userToChatId
        const { id: userToChatId } = req.params; 
        
        const senderId = req.user._id; //current user

        //Attempting to find conversation in DB including both sender and receiver
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId]},
        
        // The `populate` method is used to fetch the actual message documents associated with the conversation, rather than just their IDs
        }).populate("messages"); 

        // if no conversation found, and empty array to indicate there are no convos/messages
        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
        
    }catch (error) {
        console.log('error in getMessage controller',error.message)
        res.status(500).json({error: "internal server error" });         
    }
} 