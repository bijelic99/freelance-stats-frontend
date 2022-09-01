import { useCallback, useMemo } from "react";
import useUser from "./useUser";

export default function useApiService() {
    const { logout, authHeaders, login: localLogin } = useUser()

    const checkIfUsernameExists = useCallback(async (username) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/user/${username}`, {
            method: 'HEAD'
        })

        if (response.ok) return true
        else if (response.status === 404) return false
        else {
            const message = `Server returned the following status: ${request.status} while checking username`
            console.error(message);
            throw Error(message)
        }
    }, [])

    const register = useCallback(async (user) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        if (response.status === 400) return await response.json()
        else if (response.status !== 201) throw new Error(`Server returned non 201 response: '${response.status}'`)
        else return await response.json()
    }, [])

    const login = useCallback(async (credentials) => {
        return fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(async res => {
            if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
            const {user, token} = await res.json()
            await localLogin(user, token)
            return user
        })
    }, [])

    const getUser = useCallback(async (userId) => {
        return fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/user/${userId}`, {
            headers: authHeaders
        }).then(async res => {
            if (request.status === 401) {
                logout()
                throw new Error(`Unauthorized`)
            }
            else if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
            return await res.json()
        })
    }, [authHeaders, logout])

    const searchUsers = useCallback(async (term, size, from) => {
        const params = new URLSearchParams()
        params.append("size", size)
        params.append("from", from)
        if (term || term === '') params.append("term", term)

        return fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/user?${params.toString()}`, {
            headers: authHeaders
        }).then(async res => {
            if (request.status === 401) {
                logout()
                throw new Error(`Unauthorized`)
            }
            else if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
            return await res.json()
        })
    }, [authHeaders, logout])

    const updateUser = useCallback(async (user) => {
        return fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/user/${user.id}`, {
            method: 'PUT',
            headers: headers.append('Content-Type', 'application/json'),
            body: JSON.stringify(user)
        }).then(async res => {
            if (request.status === 401) {
                logout()
                throw new Error(`Unauthorized`)
            }
            else if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
            return await res.json()
        })
    }, [authHeaders, logout])

    const updatePassword = useCallback(async (userId, passwordPayload) => {
        return fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/user/${userId}/updatePassword`, {
            method: 'PUT',
            headers: headers.append('Content-Type', 'application/json'),
            body: JSON.stringify(passwordPayload)
        }).then(async res => {
            if (request.status === 401) {
                logout()
                throw new Error(`Unauthorized`)
            }
            else if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
            return await res.json()
        })
    }, [authHeaders, logout])

    const deleteUser = useCallback(async (userId) => {
        return fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/user/${userId}`, { method: 'DELETE', headers: headers }).then(async res => {
            if (request.status === 401) {
                logout()
                throw new Error(`Unauthorized`)
            }
            else if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
            return
        })
    }, [authHeaders, logout])

    return {
        checkIfUsernameExists,
        register,
        login,
        getUser,
        searchUsers,
        updateUser,
        updatePassword,
        deleteUser
    }

}