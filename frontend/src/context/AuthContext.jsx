import { createContext, useState, useContext } from "react";


export const AuthContext = createContext();

export const useAuthContext = () => {
    // Use the useContext hook to access the current authentication context.
    // This allows any component that calls useAuthContext to directly access the authUser state and the setAuthUser function.
    return useContext(AuthContext);
}

// Context provider component to manage authentication state.
export const AuthContextProvider = ({ children }) => {
    
    // Initialize authentication state with user data from local storage or set to null if none.
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('chat-user')) || null);

    // Provide auth state and updater function to all child components.
    return (
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            {children} {/* Render child components with access to auth context. */}
        </AuthContext.Provider>
    );

} 