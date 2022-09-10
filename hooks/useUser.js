import { useRouter } from "next/router";
import { useCallback, useState, useEffect, useMemo } from "react";
import { callFunctionAndThrowOnHttpErrorWithStatus } from "../utils/httpRequestUtils";
import { useLocalStorage } from 'react-use'

export default function useUser() {
    const [token, setToken, removeToken] = useLocalStorage('token', null)
    const [user, setUser, removeUser] = useLocalStorage('user', null)
    const router = useRouter()

    const isLoggedIn = useMemo(() => user && token && true, [user, token])

    const login = useCallback(async (user, token) => {
        if (!isLoggedIn) {
            setToken(token)
            setUser(user)
            router.push('/')
            return user
        } else throw new Error("Login impossible, already logged in")
    }, [isLoggedIn, setToken, setUser])

    const logout = useCallback(() => {
        if (isLoggedIn) {
            removeToken()
            removeUser()
            router.push('/login')
        } else throw new Error("Logout impossible, not logged in")
    }, [isLoggedIn, setToken, setUser])

    const authHeaders = useMemo(() => {
        return { 'Authorization': `Bearer ${token}` }
    }, [token])

    const logoutIf401 = useCallback(callFunctionAndThrowOnHttpErrorWithStatus(logout, 401), [logout])

    const authHeadersWithJsonContentType = useMemo(()=>{
        return {...authHeaders, 'Content-Type': 'application/json'}
    }, [authHeaders])

    return { user, token, isLoggedIn, login, logout, authHeaders, logoutIf401, authHeadersWithJsonContentType }
}