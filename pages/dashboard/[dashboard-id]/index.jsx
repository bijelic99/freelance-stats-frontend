import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Dashboard from "../../../components/Dashboard";
import { cssOverride } from "../../../staticValues/loader-config";

export default function DashboardPage() {
    const router = useRouter()

    const [dashboard, setDashboard] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const dashboardId = router.query['dashboard-id']
        if (dashboardId) {
            setLoading(true)
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}`)
                .then(res => {
                    if (res.status === 200) {
                        return res.json()
                    }
                    else {
                        throw new Exception(`Server returned non 200 response: '${res.status}'`)
                    }
                })
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
                dashboard && <Dashboard dashboard={dashboard}/>
            }
        </>
    )
}