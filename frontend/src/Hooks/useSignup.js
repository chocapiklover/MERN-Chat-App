import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()

    
    const signup = async ({fullName,username,password,confirmPassword,gender}) => {

        // goes through Input validation of handleInputErrors
        const success = handleInputErrors({fullName,username,password,confirmPassword,gender})
        if (!success) return;
        
        setLoading(true);
        try {

            //goes to the auth controller where the actual logic is
            const res = await fetch(`/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({fullName,username,password,confirmPassword,gender})
            })

            const data = await res.json()
            if (data.error){
                toast.error(error.message)
            }
            console.log(data)
            
            //save to local storage
            localStorage.setItem('chat-user', JSON.stringify(data))

            //save to  context
            setAuthUser(data);
            
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }
    
    return { loading, signup }
}
export default useSignup


//input validation
function handleInputErrors({fullName,username,password,confirmPassword,gender}) {
    if (!fullName || !username || !password || !confirmPassword || !gender ){
        toast.error('Please fill in all the fields')
        return false;
    }

    if (password !== confirmPassword) {
        toast.error('Password must be matching')
        return false;
    }

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return false;
    }

    return true;
}

