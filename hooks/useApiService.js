import { useCallback, useContext, useMemo } from "react";
import { UserManagementContext } from "../contexts/userManagementContext";
import { executeHttpRequest, returnJsonOnStatus } from "../utils/httpRequestUtils";

export default function useApiService() {
    const { token, logout, authHeaders, logoutIf401, authHeadersWithJsonContentType } = useContext(UserManagementContext)

    const fetchSources = useCallback(
        async () => executeHttpRequest(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sources`,
            'GET',
            null,
            authHeaders,
            returnJsonOnStatus(),
            logoutIf401
        ),
        [authHeaders, logoutIf401]
    )

    const fetchChartsMetadata = useCallback(
        async () => executeHttpRequest(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/charts-metadata`,
            'GET',
            null,
            authHeaders,
            returnJsonOnStatus(),
            logoutIf401
        ),
        [authHeaders, logoutIf401]
    )

    const getDashboard = useCallback(
        async (dashboardId) => executeHttpRequest(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}`,
            'GET',
            null,
            authHeaders,
            returnJsonOnStatus(),
            logoutIf401
        ),
        [authHeaders, logoutIf401]
    )

    const createDashboard = useCallback(
        async (dashboard) => executeHttpRequest(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard`,
            'POST',
            dashboard,
            authHeadersWithJsonContentType,
            returnJsonOnStatus(201),
            logoutIf401
        ),
        [authHeadersWithJsonContentType, logoutIf401]
    )

    const updateDashboard = useCallback(
        async (dashboard) => executeHttpRequest(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard`,
            'PUT',
            dashboard,
            authHeadersWithJsonContentType,
            returnJsonOnStatus(),
            logoutIf401
        ),
        [authHeadersWithJsonContentType, logoutIf401]
    )

    const getChartData = useCallback(
        async (dashboardId) => executeHttpRequest(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}/chart-data`,
            'GET',
            null,
            authHeaders,
            returnJsonOnStatus(),
            logoutIf401
        ),
        [authHeaders, logoutIf401]
    )

    const getChart = useCallback(
        async (dashboardId, chartId) => executeHttpRequest(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}/charts/${chartId}`,
            'GET',
            null,
            authHeaders,
            returnJsonOnStatus(),
            logoutIf401
        ),
        [authHeaders, logoutIf401]
    )

    const addChart = useCallback(
        async (dashboardId, chart) => executeHttpRequest(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}/charts`,
            'POST',
            chart,
            authHeadersWithJsonContentType,
            returnJsonOnStatus(201),
            logoutIf401
        ),
        [authHeadersWithJsonContentType, logoutIf401]
    )

    const updateChart = useCallback(
        async (dashboardId, chart) => executeHttpRequest(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}/charts`,
            'PUT',
            chart,
            authHeadersWithJsonContentType,
            returnJsonOnStatus(),
            logoutIf401
        ),
        [authHeadersWithJsonContentType, logoutIf401]
    )

    const searchDashboards = useCallback(
        async (term, size, from) => {
            const params = new URLSearchParams()
            params.append("size", size)
            params.append("from", from)
            if (term || term === '') params.append("term", term)

            return await executeHttpRequest(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard?${params.toString()}`,
                'GET',
                null,
                authHeaders,
                returnJsonOnStatus(),
                logoutIf401
            )
        },
        [authHeaders, logoutIf401]
    )

    const updateVisualizationData = useCallback(
        async (dashboardId, visualizationDataObj) => executeHttpRequest(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}/charts/visualizationData`,
            'PUT',
            visualizationDataObj,
            authHeadersWithJsonContentType,
            returnJsonOnStatus(),
            logoutIf401
        ),
        [authHeadersWithJsonContentType, logoutIf401]
    )

    return {
        fetchSources,
        fetchChartsMetadata,
        getDashboard,
        createDashboard,
        updateDashboard,
        getChartData,
        getChart,
        addChart,
        updateChart,
        searchDashboards,
        updateVisualizationData
    }

}