import Head from "next/head";
import { useCallback } from "react";
import ChartForm from "../../../../components/forms/chartForm/ChartForm";
import { fetchChartsMetadata, fetchSources } from "../../../../sharedFunctions/apiFetch";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'

function ChartCreate({sources, chartsMetadata}) {

    const router = useRouter()

    const submitForm = useCallback(async (chart) => {
        const dashboardId = router.query['dashboard-id']
        if(dashboardId) {
            const response = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}/charts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chart)
            })
            .then(async res => {
                if(res.status !== 201) throw new Exception(`Server returned non 201 response: '${res.status}'`)
                const chart = await res.json()
                router.push(`/dashboard/${dashboardId}`)
                return chart
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