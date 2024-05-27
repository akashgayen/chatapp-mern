import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async ({ username, password }) => {
        try {
            setLoading(true);
            const success = handleInputErrors({ username, password });
            if (!success) return;
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            const data = await res.json()
            if (data.error || res.status !== 201) {
                throw new Error(data.error)
            }
            localStorage.setItem('authUser', JSON.stringify(data))
            setAuthUser(data)
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
}

export default useLogin

function handleInputErrors({ username, password }) {
    if (!username || !password) {
        toast.error("All fields not filled!")
        return false
    }
    return true
}