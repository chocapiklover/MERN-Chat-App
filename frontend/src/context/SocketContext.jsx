import { useState, createContext, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'


const SocketContext = createContext() 

export const useSocketContext = ()  => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)  //use to store WebSocket connection
    const [onlineUsers, setOnlineUsers] = useState([])
    const { authUser } = useAuthContext()

    //Runs once when the component mounts
    useEffect(() => {

        //creates new WebSocket connection using io
        if(authUser) {
            const socket = io('https://mern-chat-app-ujdb.onrender.com/',{
            // passing the auth userid to the websocket
            query:{
                userId: authUser._id
            }
        });
        
        setSocket(socket);

        socket.on('getOnlineUsers', (users) => {
            setOnlineUsers(users);
        });
        
        } else {
            if(socket) {
                socket.close();
                setSocket(null);
            }
        }

    },[authUser])

    // allows access to the WebSocket connection and list of online users
    return <SocketContext.Provider value={{socket, onlineUsers }}>{children}</SocketContext.Provider>
}