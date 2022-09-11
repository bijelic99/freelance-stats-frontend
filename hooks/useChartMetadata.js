import { useContext, useEffect, useState } from "react"
import { UserManagementContext } from "../contexts/userManagementContext"
import useApiService from "./useApiService"

const useChartMetadata = () => {
    const {isLoggedIn} = useContext(UserManagementContext)
    const { fetchChartsMetadata } = useApiService()
    const [chartMetadata, setChartMetadata] = useState({})

    useEffect(() =>{
        if(isLoggedIn)
            fetchChartsMetadata()
                .then(setChartMetadata)
    }, [isLoggedIn])
    
    return chartMetadata
}

export default useChartMetadata