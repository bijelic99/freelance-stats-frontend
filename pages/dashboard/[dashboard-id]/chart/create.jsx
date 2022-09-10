import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import ChartForm from "../../../../components/forms/chartForm/ChartForm";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import useApiService from "../../../../hooks/useApiService";

function ChartCreate() {

    const [chartsMetadata, setChartsMetadata] = useState({})
    const [sources, setSources] = useState([])
    const { addChart, fetchChartsMetadata, fetchSources } = useApiService()

    useEffect(()=>{
        fetchChartsMetadata().then(setChartsMetadata)
        fetchSources().then(setSources)
    }, [])

    const router = useRouter()

    const submitForm = useCallback(async (chart) => {
        const dashboardId = router.query['dashboard-id']
        if(dashboardId) {
            const response = addChart(dashboardId, chart)
            
            response.then(async chart => {
                router.push(`/dashboard/${dashboardId}`)
            })

            toast.promise(
                response,
                {
                    pending: 'Creating the chart',
                    success: 'Successfully created the chart',
                    error: 'Unexpected error while creating the chart'
                }
            )
    
            return response
        } else return Promise.reject(new Error("DashboardId was not set"))
    }, [])

    return (
        <>
            <Head>
                <title>Create chart</title>
            </Head>
            <ChartForm sources={sources} chartsMetadata={chartsMetadata} submitForm={submitForm}></ChartForm>
        </>
    )
}

export default ChartCreate