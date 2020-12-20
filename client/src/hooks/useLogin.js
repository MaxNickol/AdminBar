import { useState, useCallback, useEffect } from 'react'



export const useLogin = () => {

    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    

    const userInfo = "userInfo"

    const login = useCallback ((jwt, id) => { 
        setToken(jwt)
        setUserId(id)

        localStorage.setItem(userInfo, JSON.stringify({userId: id, token:jwt}));
    }, [])

    const logout = useCallback (() => { 
        setToken(null)
        setUserId(null)
        localStorage.removeItem(userInfo);
    }, [])

    useEffect(() => { 
        let data = JSON.parse(localStorage.getItem(userInfo));

        if(data && data.token) { 
            login(data.token, data.userId)
        }

    }, [login])


    return {login, logout, token, userId}
}