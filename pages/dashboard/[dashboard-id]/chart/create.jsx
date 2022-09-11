import Head from "next/head";
import { useCallback, useContext, useEffect, useState } from "react";
import ChartForm from "../../../../components/forms/chartForm/ChartForm";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import useApiService from "../../../../hooks/useApiService";
import { SourcesContext } from "../../../../contexts/sourcesContext";
import { ChartMetadataContext } from "../../../../contexts/chartMetadataContext";
import useChartMetadata from "../../../../hooks/useChartMetadata";
import useSources from "../../../../hooks/useSources";

function ChartCreate() {
    const { addChart } = useApiService()

    const router = useRouter()

    const submitForm = useCallback(async (chart) => {
        const dashboardId = router.query['dashboard-id']
        if (dashboardId) {
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
            <ChartMetadataContext.Provider value={useChartMetadata()}>
                <SourcesContext.Provider value={useSources()}>
                    <ChartForm submitForm={submitForm}></ChartForm>
                </SourcesContext.Provider>
            </ChartMetadataContext.Provider>
        </>
    )
}

export default ChartCreate