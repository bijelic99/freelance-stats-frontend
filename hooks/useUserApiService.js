import { useCallback, useContext, useMemo } from "react";
import { UserManagementContext } from "../contexts/userManagementContext";
import { executeHttpRequest, HTTPError } from "../utils/httpRequestUtils";

export default function useUserApiService() {

    const { logout, authHeaders, authHeadersWithJsonContentType, login: localLogin } = useContext(UserManagementContext)

    const checkIfUsernameExists = useCallback(async (username) => executeHttpRequest(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/user/${username}`,
        'HEAD',
        null,
        null,
        response => {
            if (response.status !== 200 && response.status !== 404) throw new Error(`Server returned the following status: ${request.status} while checking username`)
            return response.status === 200
        },
        (error) => {
            console.error(error)
            return false
        }
    ), [])

    const register = useCallback(async (user) => executeHttpRequest(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/register`,
        'POST',
        user,
        {
            'Content-Type': 'application/json'
        },
        async (response) => {
            if (response.status === 201 || response.status === 400) {
                return await response.json()
            }
            else throw new HTTPError(response.status, "Unexpected response")
        },
        (error) => {
            console.error(error)
        }
    ), [])

    const login = useCallback(async (credentials) => executeHttpRequest(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/login`,
        'POST',
        credentials,
        {
            'Content-Type': 'application/json'
        },
        async (response) => {
            if (response.status === 200) {
                const { user, token } = await res.json()
                await localLogin(user, token)
                return user
            }
            else throw new HTTPError(response.status, "Unexpected response")
        },
        (error) => {
            console.error(error)
        }
    ), [localLogin])

    const getUser = useCallback(
        async () => executeHttpRequest(
            `${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/user/${userId}`,
            'GET',
            null,
            authHeaders,
            returnJsonOnStatus(),
            logoutIf401
        ),
        [authHeaders, logoutIf401]
    )

    const searchUsers = useCallback(
        async (term, size, from) => {
            const params = new URLSearchParams()
            params.append("size", size)
            params.append("from", from)
            if (term || term === '') params.append("term", term)

            return await executeHttpRequest(
                `${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/user?${params.toString()}`,
                'GET',
                null,
                authHeaders,
                returnJsonOnStatus(),
                logoutIf401
            )
        },
        [authHeaders, logoutIf401]
    )

    const updateUser = useCallback(
        async (user) => executeHttpRequest(
            `${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/user/${user.id}`,
            'PUT',
            user,
            authHeadersWithJsonContentType,
            returnJsonOnStatus(),
            logoutIf401
        ),
        [authHeadersWithJsonContentType, logoutIf401]
    )

    const updatePassword = useCallback(
        async (userId, passwordPayload) => executeHttpRequest(
            `${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/user/${userId}/updatePassword`,
            'PUT',
            passwordPayload,
            authHeadersWithJsonContentType,
            returnJsonOnStatus(),
            logoutIf401
        ),
        [authHeadersWithJsonContentType, logoutIf401]
    )

    const deleteUser = useCallback(
        async (userId) => executeHttpRequest(
            `${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/user/${userId}`,
            'DELETE',
            null,
            authHeaders,
            (response) => {
                if (response.status === 200) {
                    return
                }
                else throw new HTTPError(response.status, `Got non ${status} response, server returned '${response.status}'`)
            },
            logoutIf401
        ),
        [authHeaders, logoutIf401]
    )

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