export async function fetchSources() {
    const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/sources`)
    if (request.status === 200) {
        return await request.json()
    } else {
        const message = `Server returned the following status: ${request.status} while fetching sourcers`
        console.error(message);
        throw Error(message)
    }
}

export async function fetchChartsMetadata() {
    const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/charts-metadata`)
    if (request.status === 200) {
        return await request.json()
    } else {
        const message = `Server returned the following status: ${request.status} while fetching charts-metadata`
        console.error(message);
        throw Error(message)
    }
}

export async function getDashboard(dashboardId) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}`)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
            else {
                throw new Error(`Server returned non 200 response: '${res.status}'`)
            }
        })
}

export async function createDashboard(dashboard) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dashboard)
    })
        .then(async res => {
            if (res.status !== 201) throw new Error(`Server returned non 201 response: '${res.status}'`)
            const dashboard = await res.json()
            return dashboard
        })
}

export async function updateDashboard(dashboard) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dashboard)
    }).then(async res => {
        if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
        const returnedDashboard = await res.json()
        return returnedDashboard
    })
}

export async function getChartData(dashboardId) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}/chart-data`)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
            else {
                throw new Error(`Server returned non 200 response: '${res.status}'`)
            }
        })
}

export async function getChart(dashboardId, chartId) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}/charts/${chartId}`)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
            else {
                throw new Error(`Server returned non 200 response: '${res.status}'`)
            }
        })
}

export async function addChart(dashboardId, chart) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}/charts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(chart)
    })
        .then(async res => {
            if (res.status !== 201) throw new Error(`Server returned non 201 response: '${res.status}'`)
            const chart = await res.json()
            return chart
        })
}

export async function updateChart(dashboardId, chart) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}/charts`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(chart)
    })
        .then(async res => {
            if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
            const chart = await res.json()
            return chart
        })
}

export async function searchDashboards(term, size, from) {
    const params = new URLSearchParams()
    params.append("size", size)
    params.append("from", from)
    if(term || term === '') params.append("term", term)

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard?${params.toString()}`)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
            else {
                throw new Error(`Server returned non 200 response: '${res.status}'`)
            }
        })
}

export async function updateVisualizationData(dashboardId, visualizationDataObj) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}/charts/visualizationData`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(visualizationDataObj)
    })
        .then(async res => {
            if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
            const chart = await res.json()
            return chart
        })
}