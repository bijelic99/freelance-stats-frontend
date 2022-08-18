export async function checkIfUsernameExists(username) {
    const request = await fetch(`${process.env.NEXT_USER_API_URL}/api/v1/user/${username}`, {
        method: 'HEAD'
    })
    if (request.status === 200) {
        return true
    }
    else if (request.status === 404) {
        return false
    }
    else {
        const message = `Server returned the following status: ${request.status} while checking username`
        console.error(message);
        throw Error(message)
    }
}

export async function register(user) {
    return fetch(`${process.env.NEXT_USER_API_URL}/api/v1/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(async res => {
        if (res.status !== 201) throw new Error(`Server returned non 201 response: '${res.status}'`)
        return await res.json()
    })
}

export async function login(credentials) {
    return fetch(`${process.env.NEXT_USER_API_URL}/api/v1/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(async res => {
        if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
        return await res.json()
    })
}

export async function getUser(userId) {
    return fetch(`${process.env.NEXT_USER_API_URL}/api/v1/user/${userId}`).then(async res => {
        if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
        return await res.json()
    })
}

export async function searchUsers(term, size, from) {
    const params = new URLSearchParams()
    params.append("size", size)
    params.append("from", from)
    if (term || term === '') params.append("term", term)

    return fetch(`${process.env.NEXT_USER_API_URL}/api/v1/user?${params.toString()}`).then(async res => {
        if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
        return await res.json()
    })
}

export async function updateUser(user) {
    return fetch(`${process.env.NEXT_USER_API_URL}/api/v1/user/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(async res => {
        if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
        return await res.json()
    })
}

export async function updatePassword(userId, passwordPayload) {
    return fetch(`${process.env.NEXT_USER_API_URL}/api/v1/user/${userId}/updatePassword`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwordPayload)
    }).then(async res => {
        if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
        return await res.json()
    })
}

export async function deleteUser(userId) {
    return fetch(`${process.env.NEXT_USER_API_URL}/api/v1/user/${userId}`, { method: 'DELETE' }).then(async res => {
        if (res.status !== 200) throw new Error(`Server returned non 200 response: '${res.status}'`)
        return
    })
}