import { useRouter } from "next/router";
import { useCallback, useContext, useMemo } from "react";
import { TokenContext } from "../contexts/tokenContext";
import { UserContext } from "../contexts/userContext";

export default function useUser() {
    const {token, setToken} = useContext(TokenContext)
    const localStorageToken = localStorage.getItem("token")
    const router = useRouter()
    if(token !== localStorageToken) {
        if (localStorageToken) {
            setToken(localStorageToken)
        } else {
            setToken(null)
        }
    }
    

    const { user, setUser } = useContext(UserContext)
    const localStorageUser = JSON.parse(localStorage.getItem("user"))
    if (user !== localStorageUser) {
        if (localStorageUser) {
            setUser(localStorageUser)
        } else {
            setUser(null)
        }
    }

    const isLoggedIn = useMemo(() => user && token && true, [user, token])

    const login = useCallback(async (user, token) => {
        if (!isLoggedIn) {
            localStorage.setItem("token", token)
            setToken(token)
            localStorage.setItem("user", JSON.stringify(user))
            setUser(user)
            router.push('/')
            return user
        } else throw new Error("Login impossible, already logged in")
    }, [isLoggedIn, setToken, setUser])

    const logout = useCallback(() => {
        if (isLoggedIn) {
            localStorage.removeItem("token")
            setToken(null)
            localStorage.removeItem("user")
            setUser(null)
            router.push('/login')
        } else throw new Error("Logout impossible, not logged in")
    }, [isLoggedIn, setToken, setUser])

    const authHeaders = useMemo(() => {
        const headers = new Headers()
        headers.append('Authorization', `Bearer ${token}`)
        return headers
    }, [token])


    return { user, token, isLoggedIn, login, logout, authHeaders }
}