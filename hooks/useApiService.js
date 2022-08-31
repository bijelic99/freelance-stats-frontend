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
            throw new Error(`Unauthorized`)
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
            throw new Error(`Unauthorized`)
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
                    throw new Error(`Unauthorized`)
                }
                else {
                    throw new Error(`Server returned non 200 response: '${res.status}'`)
                }
            })
    }, [authHeaders, logout])

    const createDashboard = useCallback(async (dashboard) => {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard`, {
            method: 'POST',
            headers: authHeaders.append('Content-Type', 'application/json'),
            body: JSON.stringify(dashboard)
        })
            .then(async res => {
                if (request.status === 401) {
                    logout()
                    throw new Error(`Unauthorized`)
                }
                else if (res.status !== 201) throw new Error(`Server returned non 201 response: '${res.status}'`)
                const dashboard = await res.json()
                return dashboard
            })
    }, [authHeaders, logout])

    const updateDashboard = useCallback(async (dashboard) => {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard`, {
            method: 'PUT',
            headers: authHeaders.append('Content-Type', 'application/json'),
            body: JSON.stringify(dashboard)
        }).then(async res => {
            if (request.status === 401) {
                logout()
                throw new Error(`Unauthorized`)
            }
            else if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
            const returnedDashboard = await res.json()
            return returnedDashboard
        })
    }, [authHeaders, logout])

    const getChartData = useCallback(async (dashboardId) => {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}/chart-data`, {
            headers: authHeaders
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
                else if (request.status === 401) {
                    logout()
                    throw new Error(`Unauthorized`)
                }
                else {
                    throw new Error(`Server returned non 200 response: '${res.status}'`)
                }
            })
    }, [authHeaders, logout])

    const getChart = useCallback(async (dashboardId, chartId) => {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}/charts/${chartId}`, {
            headers: authHeaders
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
                else {
                    throw new Error(`Server returned non 200 response: '${res.status}'`)
                }
            })
    }, [authHeaders, logout])

    const addChart = useCallback(async (dashboardId, chart) => {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}/charts`, {
            method: 'POST',
            headers: authHeaders.append('Content-Type', 'application/json'),
            body: JSON.stringify(chart)
        })
            .then(async res => {
                if (request.status === 401) {
                    logout()
                    throw new Error(`Unauthorized`)
                }
                if (res.status !== 201) throw new Error(`Server returned non 201 response: '${res.status}'`)
                const chart = await res.json()
                return chart
            })
    }, [authHeaders, logout])

    const updateChart = useCallback(async (dashboardId, chart) => {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}/charts`, {
            method: 'PUT',
            headers: authHeaders.append('Content-Type', 'application/json'),
            body: JSON.stringify(chart)
        })
            .then(async res => {
                if (request.status === 401) {
                    logout()
                    throw new Error(`Unauthorized`)
                }
                if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
                const chart = await res.json()
                return chart
            })
    }, [authHeaders, logout])

    const searchDashboards = useCallback(async (term, size, from) => {
        const params = new URLSearchParams()
        params.append("size", size)
        params.append("from", from)
        if (term || term === '') params.append("term", term)

        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard?${params.toString()}`, {
            headers: authHeaders
        })
            .then(async res => {
                if (res.status === 200) {
                    return await res.json()
                }
                else if (request.status === 401) {
                    logout()
                    throw new Error(`Unauthorized`)
                }
                else {
                    throw new Error(`Server returned non 200 response: '${res.status}'`)
                }
            })
    }, [authHeaders, logout])

    const updateVisualizationData = useCallback(async (dashboardId, visualizationDataObj) => {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}/charts/visualizationData`, {
            method: 'PUT',
            headers: authHeaders.append('Content-Type', 'application/json'),
            body: JSON.stringify(visualizationDataObj)
        })
            .then(async res => {
                if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
                const chart = await res.json()
                return chart
            })
    }, [authHeaders, logout])

}