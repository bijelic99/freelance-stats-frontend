import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Dashboard from "../../../components/Dashboard";
import useApiService from "../../../hooks/useApiService";
import { cssOverride } from "../../../staticValues/loader-config";

export default function DashboardPage() {
    const router = useRouter()

    const [dashboard, setDashboard] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const {fetchChartsMetadata, getDashboard} = useApiService()
    
    const [chartsMetadata, setChartsMetadata] = useState(null)
    useEffect(() => {
        fetchChartsMetadata()
            .then(metadata => setChartsMetadata(metadata))
    }, [])

    useEffect(() => {
        const dashboardId = router.query['dashboard-id']
        if (dashboardId) {
            setLoading(true)
            getDashboard(dashboardId)
                .then((data) => {
                    setDashboard(data)
                    setLoading(false)
                    setError(false)
                })
                .catch((err) => {
                    console.error(err)
                    setError(true)
                    setLoading(false)
                })
        }
    }, [router, setDashboard, setLoading, setError])

    return (
        <>
            <Head>
                <title>{dashboard?.name || 'Dashboard'}</title>
            </Head>
            <ClipLoader loading={isLoading} cssOverride={cssOverride} />
            {
                error && <div>Unexpected error happened</div>
            }
            {
                dashboard && <Dashboard dashboard={dashboard} chartsMetadata={chartsMetadata} />
            }
        </>
    )
}