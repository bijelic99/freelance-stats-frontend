import Head from "next/head";
import { useCallback } from "react";
import DashboardForm from "../../components/forms/DashboardForm";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import { createDashboard } from "../../services/apiService";

export default function CreateDashboard() {
    const currentUserId = ""
    const router = useRouter()

    const submitForm = useCallback(async (dashboard) => {
        const response = createDashboard(dashboard)
        
        response.then(() => router.push(`/dashboard/${dashboard.id}`))

        toast.promise(
            response,
            {
                pending: 'Creating the dashboard',
                success: 'Successfully created the dashboard',
                error: 'Unexpected error while creating the dashboard'
            }
        )

        return response
    }, [])

    return (
        <>
            <Head>
                <title>Create dashboard</title>
            </Head>
            <DashboardForm submitForm={submitForm} currentUserId={currentUserId} />
        </>
    )
}