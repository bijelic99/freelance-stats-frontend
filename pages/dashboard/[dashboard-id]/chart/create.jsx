import Head from "next/head";
import { useCallback } from "react";
import ChartForm from "../../../../components/forms/chartForm/ChartForm";
import { addChart, fetchChartsMetadata, fetchSources } from "../../../../services/apiService";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'

function ChartCreate({sources, chartsMetadata}) {

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

export async function getStaticPaths() {

    return {
        paths: [],
        fallback: 'blocking'
    }
}

export async function getStaticProps() {
    const sources = await fetchSources()
    const chartsMetadata = await fetchChartsMetadata()

    return {
        props: {
            sources,
            chartsMetadata
        }
    }
}

export default ChartCreate