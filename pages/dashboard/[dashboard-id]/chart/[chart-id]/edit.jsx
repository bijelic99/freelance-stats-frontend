import Head from "next/head";
import { useCallback, useState, useEffect } from "react";
import ChartForm from "../../../../../components/forms/chartForm/ChartForm";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import ClipLoader from "react-spinners/ClipLoader";
import { cssOverride } from "../../../../../staticValues/loader-config";
import useApiService from "../../../../../hooks/useApiService";
import { ChartMetadataContext } from "../../../../../contexts/chartMetadataContext";
import useChartMetadata from "../../../../../hooks/useChartMetadata";
import { SourcesContext } from "../../../../../contexts/sourcesContext";
import useSources from "../../../../../hooks/useSources";

function ChartEdit({ sources, chartsMetadata }) {

    const router = useRouter()

    const [chart, setChart] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { getChart, updateChart } = useApiService()

    useEffect(() => {
        const dashboardId = router.query['dashboard-id']
        const chartId = router.query['chart-id']
        if (dashboardId && chartId) {
            setLoading(true)
            getChart(dashboardId, chartId)
                .then((data) => {
                    setChart(data)
                    setLoading(false)
                    setError(false)
                })
                .catch((err) => {
                    console.error(err)
                    setError(true)
                    setLoading(false)
                })
        }
    }, [router, setChart, setLoading, setError])

    const submitForm = useCallback(async (chart) => {
        const dashboardId = router.query['dashboard-id']
        if (dashboardId) {
            const response = updateChart(dashboardId, chart)

            response.then(async chart => {
                router.push(`/dashboard/${dashboardId}`)
            })

            toast.promise(
                response,
                {
                    pending: 'Updating the chart',
                    success: 'Successfully updated the chart',
                    error: 'Unexpected error while updating the chart'
                }
            )

            return response
        } else return Promise.reject(new Error("DashboardId or chartId were not set"))
    }, [])

    return (
        <>
            <Head>
                <title>Create chart</title>
            </Head>
            <ClipLoader loading={isLoading} cssOverride={cssOverride} />
            <ChartMetadataContext.Provider value={useChartMetadata()}>
                <SourcesContext.Provider value={useSources()}>
                    <>
                        {
                            error && <div>Unexpected error happened</div>
                        }
                        {
                            chart && <>

                                <ChartForm submitForm={submitForm} chart={chart} edit submitButtonText="Edit form"></ChartForm>
                            </>
                        }
                    </>
                </SourcesContext.Provider>
            </ChartMetadataContext.Provider>
        </>
    )
}

export default ChartEdit