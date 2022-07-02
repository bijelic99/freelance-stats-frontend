import Head from "next/head";
import { useCallback } from "react";
import DashboardForm from "../../components/forms/DashboardForm";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'

export default function CreateDashboard() {
    const currentUserId = ""
    const router = useRouter()

    const submitForm = useCallback(async (dashboard) => {
        const response = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dashboard)
        })
        .then(async res => {
            if(res.status !== 201) throw new Exception(`Server returned non 201 response: '${res.status}'`)
            const dashboard = await res.json()
            router.push(`/dashboard/${dashboard.id}`)
            return dashboard
        })

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