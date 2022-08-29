import { useCallback, useMemo } from "react";
import useUser from "./useUser";

export default function useApiService() {
    const { token, logout } = useUser()

    const authHeaders = useMemo(() => {
        const headers = new Headers()
        headers.append('Authorization', `Bearer ${token}`)
        return headers
    }, [token])

    const fetchSources = useCallback(async () => {
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/sources`, {
            headers: authHeaders
        })
        if (request.status === 200) {
            return await request.json()
        } else if (request.status === 401) {
            logout()
        } else {
            const message = `Server returned the following status: ${request.status} while fetching sourcers`
            console.error(message);
            throw Error(message)
        }
    }, [authHeaders, logout])

    const fetchChartsMetadata = useCallback(async () => {
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/charts-metadata`, {
            headers: authHeaders
        })
        if (request.status === 200) {
            return await request.json()
        } else if (request.status === 401) {
            logout()
        } else {
            const message = `Server returned the following status: ${request.status} while fetching charts-metadata`
            console.error(message);
            throw Error(message)
        }
    }, [authHeaders, logout])

    const getDashboard = useCallback(async (dashboardId) => {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}`, {
            headers: authHeaders
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                } else if (request.status === 401) {
                    logout()
                }
                else {
                    throw new Error(`Server returned non 200 response: '${res.status}'`)
                }
            })
    }, [authHeaders, logout])

    const updateDashboard = useCallback(async (dashboard) => {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dashboard)
        }).then(async res => {
            if (request.status === 401) {
                logout()
            }
            else if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
            const returnedDashboard = await res.json()
            return returnedDashboard
        })
    }, [authHeaders, logout])

}