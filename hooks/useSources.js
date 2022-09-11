import { useContext, useEffect, useState } from "react"
import { UserManagementContext } from "../contexts/userManagementContext"
import useApiService from "./useApiService"

const useSources = () => {
    const { isLoggedIn } = useContext(UserManagementContext)
    const { fetchSources } = useApiService()
    const [sources, setSources] = useState([])

    useEffect(() => {
        if (isLoggedIn)
            fetchSources()
                .then(setSources)
    }, [isLoggedIn])

    return sources
}

export default useSources