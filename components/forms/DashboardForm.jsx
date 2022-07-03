import { useCallback, useState } from "react"

const newDashboard = {
    name: "",
    public: false
}

export default function DashboardForm({ submitForm, currentUserId, dashboard = newDashboard, submitButtonText = "Create dashboard" }) {

    const [submited, setSubmited] = useState(false)

    const transformInput = useCallback(
        async (e) => {
            setSubmited(true)
            e.preventDefault()
            const formData = new FormData(e.target)
            const formObject = Object.fromEntries(formData.entries())
            const timestamp = new Date().toISOString()
            const transformedInput = {
                id: "",
                ownerId: currentUserId,
                usersWithAccess: [currentUserId],
                charts: [],
                deleted: false,
                createdAt: timestamp,
                ...dashboard,
                ...formObject,
                public: formObject.public ? true : false,
                modifiedAt: timestamp
            }
            console.debug(transformedInput)
            submitForm(transformedInput)
            .then(() => {
                e.target.reset()
            })
            .catch(() => {
                setSubmited(false)
            })
        }, [submitForm, setSubmited]
    )

    return (
        <>
            <form className="flex flex-col gap-1 px-2 py-2" onSubmit={transformInput}>
                <label htmlFor="name">Name: </label>
                <input id="name" name="name" type="text" className="border p-1" defaultValue={dashboard.name} required/>
                <label htmlFor="public">Is dashboard public: </label>
                <input id="public" name="public" type="checkbox" className="border p-1"/>
                <button type="submit" disabled={submited}>{submitButtonText}</button>
            </form>
        </>
    )
}