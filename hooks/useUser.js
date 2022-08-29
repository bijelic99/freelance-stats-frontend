import { useCallback, useContext, useMemo, useState } from "react";
import { TokenContext } from "../contexts/tokenContext";
import { UserContext } from "../contexts/userContext";
import { login as backendLogin } from "../services/userApiService"

export default function useUser() {
    const { token, setToken } = useContext(TokenContext)
    const localStorageToken = localStorage.getItem("token")
    if (localStorageToken) {
        setToken(localStorageToken)
    } else {
        setToken(null)
    }

    const { user, setUser } = useContext(UserContext)
    const localStorageUser = JSON.parse(localStorage.getItem("user"))
    if (localStorageUser) {
        setUser(localStorageUser)
    } else {
        localStorageUser(null)
    }

    const isLoggedIn = useMemo(() => user && token && true, [user, token])

    const login = useCallback(async (username, password)=>{
        if(!isLoggedIn) {
            backendLogin({
                username,
                password
            })
            .then(({user, token})=>{
                localStorage.setItem("token", token)
                setToken(token)
                localStorage.setItem("user", JSON.stringify(user))
                setUser(user)
                return user
            })
        } else throw new Error("Login impossible, already logged in")
    }, [isLoggedIn, setToken, setUser])

    const logout = useCallback(() => {
        if(isLoggedIn) {
            localStorage.removeItem("token")
            setToken(null)
            localStorage.removeItem("user")
            setUser(null)
        } else  throw new Error("Logout impossible, not logged in")
    }, [isLoggedIn, setToken, setUser])


    return {user, token, isLoggedIn, login, logout}
}