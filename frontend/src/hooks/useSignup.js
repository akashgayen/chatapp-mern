import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContext()
    const signUp = async ({ fullName, username, password, confirmPassword }) => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword })
        if (!success) return;
        setLoading(true)
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword })
            })
            const data = await res.json()
            if (res.status !== 201 || data.error) {
                throw new Error(data.error)
            }
            localStorage.setItem("authUser", JSON.stringify(data))
            setAuthUser(data)
        } catch (e) {
            toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, signUp }
}

export default useSignup

function handleInputErrors({ fullName, username, password, confirmPassword }) {
    if (!fullName || !username || !password || !confirmPassword) {
        toast.error("All fields not filled!")
        return false
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match!")
        return false
    }
    if (length.password < 6) {
        toast.error("Passwords needs to be atleast 6 charecters!")
        return false
    }
    return true
}