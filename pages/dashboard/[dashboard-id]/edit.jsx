import Head from "next/head";
import { useCallback, useState, useEffect } from "react";
import DashboardForm from "../../../components/forms/DashboardForm";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import ClipLoader from "react-spinners/ClipLoader";
import { cssOverride } from "../../../staticValues/loader-config";
import { getDashboard, updateDashboard } from "../../../services/apiService";

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

    const submitForm = useCallback(async (submitedDashboard) => {
        const response = updateDashboard(submitedDashboard)

        response.then(dashboard => {
            router.push(`/dashboard/${dashboard.id}`)
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