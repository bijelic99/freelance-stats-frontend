export async function fetchSources() {
    const request = await fetch(`${process.env.API_URL}/api/v1/sources`)
    if(request.status === 200 ){
        return await request.json()
    } else {
        const message = `Server returned the following status: ${request.status} while fetching sourcers`
        console.error(message);
        throw Exception(message)
    }
}

export async function fetchChartsMetadata() {
    const request = await fetch(`${process.env.API_URL}/api/v1/charts-metadata`)
    if(request.status === 200 ){
        return await request.json()
    } else {
        const message = `Server returned the following status: ${request.status} while fetching charts-metadata`
        console.error(message);
        throw Exception(message)
    }
}