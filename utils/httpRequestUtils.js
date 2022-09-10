export const executeHttpRequest = async (url, method, body, headers, onSuccess, onFailure) =>
    fetch(url, {
        method,
        headers: {"X-Requested-With": "fetch", ...(headers || {})},
        body: body ? JSON.stringify(body) : null
    })
        .then(onSuccess)
        .catch(onFailure)

export const returnJsonOnStatus = (status = 200) => async (response) => {
    if (response.status === status) {
        const json = await response.json()
        console.trace(json)
        return json
    }
    else throw new HTTPError(response.status, `Got non ${status} response, server returned '${response.status}'`)
}

export const callFunctionAndThrowOnHttpErrorWithStatus = (fn, httpStatus) => (error) => {
    console.error(error)
    if (error.name === "HTTPError" && error.httpStatus === httpStatus) {
        fn()
        throw error
    } else throw error
}

export class HTTPError extends Error {
    constructor(httpStatus, message) {
        super(message)
        this.name = "HTTPError"
        this.httpStatus = httpStatus
    }
}