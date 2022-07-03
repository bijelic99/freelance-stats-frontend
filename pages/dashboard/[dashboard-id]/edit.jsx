import Head from "next/head";
import { useCallback, useState, useEffect } from "react";
import DashboardForm from "../../../components/forms/DashboardForm";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import ClipLoader from "react-spinners/ClipLoader";
import { cssOverride } from "../../../staticValues/loader-config";

export default function EditDashboard() {
    const currentUserId = ""
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

    const submitForm = useCallback(async (submitedDashboard) => {
        const response = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitedDashboard)
        })
        .then(async res => {
            if(res.status !== 200) throw new Exception(`Server returned non 200 response: '${res.status}'`)
            const dashboard = await res.json()
            router.push(`/dashboard/${dashboard.id}`)
            return dashboard
        })

        toast.promise(
            response,
            {
                pending: 'Updating the dashboard',
                success: 'Successfully updated the dashboard',
                error: 'Unexpected error while updating the dashboard'
            }
        )

        return response
    }, [])

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
                dashboard && <DashboardForm submitForm={submitForm} dashboard={dashboard} currentUserId={currentUserId} submitButtonText="Update dashboard" />
            }
        </>
    )
}