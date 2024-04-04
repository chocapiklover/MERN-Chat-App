import React from 'react'
import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const useLogin = () => {
  
    // State hook for managing the loading status
    const [loading, setLoading] = useState(false)

    // Access the authentication context to set the authenticated user
    const { setAuthUser } = useAuthContext()

    // Function to handle login logic
    const login = async (username, password) => {

        // goes through Input validation of handleInputErrors
        const success = handleInputErrors(username,password)
        if (!success) return;

        // Indicate loading process begins
        setLoading(true)
        try {
            // Attempt to log in by sending a POST request to the login API endpoint
            const res = await fetch("/api/auth/login", {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({username, password}),
            })

            // Parse the JSON response from the server
            const data = await res.json()
            // If there's an error in the response, throw an exception
            if(data.error){
                throw new Error(data.error)
            }

            // On successful login, store user data in localStorage
            localStorage.setItem("chat-user", JSON.stringify(data))
            // Update the authentication context with the new user data
            setAuthUser(data)

        } catch (error) {
            // If login fails, show an error message
            toast.error(error.message) 
        } finally {
            // Reset loading status regardless of the outcome
            setLoading(false)
        }
        
    }
    // Expose the loading state and login function to other components
    return { loading, login }
}

export default useLogin

function handleInputErrors(username,password) {
    if (!username || !password ){
        toast.error('Please fill in all the fields')
        return false;
    }
    return true;
}