import { Combobox } from "@headlessui/react"
import { CheckIcon } from '@heroicons/react/solid'
import { useCallback, useState, useEffect, Fragment } from "react"
import useUserApiService from "../../hooks/useUserApiService"

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
                usersWithAccess: selectedUsers.map(u => u.id),
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
        }, [submitForm, setSubmited, selectedUsers]
    )

    const { searchUsers } = useUserApiService()

    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])

    const userInSelectedUsers = useCallback((id) => selectedUsers.find(user => user.id === id) && true, [selectedUsers])

    const setQueryEvent = useCallback((e) => {
        setQuery(e.target.value)
    }, [setQuery])

    useEffect(() => {
        if (query) {
            searchUsers(query, 10, 0).then(response => setResults(response.hits))
            console.log(selectedUsers)
        }
    }, [query, setResults])

    return (
        <>
            <form className="flex flex-col gap-1 px-2 py-2 w-1/2 mx-auto" onSubmit={transformInput}>
                <label htmlFor="name">Name: </label>
                <input id="name" name="name" type="text" className="border p-1" defaultValue={dashboard.name} required />
                <label htmlFor="usersWithAccess">Users with access:</label>
                <Combobox
                    value={selectedUsers}
                    onChange={setSelectedUsers}
                    multiple
                >
                    <Combobox.Input
                        onChange={setQueryEvent}
                        displayValue={(user) => user.username}
                        className="border p-1"
                    />
                    <Combobox.Options>
                        {results.map(user => <Combobox.Option key={user.id} value={user} as={Fragment}>
                            {({ active, selected }) => (
                                <li className={`${active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                    }`}>
                                    {user.username}
                                    {userInSelectedUsers(user.id) && <CheckIcon className = "h-5 w-5 inline-block" />}
                                </li>
                            )}
                        </Combobox.Option>)}
                    </Combobox.Options>
                </Combobox>
                <div className="flex flex-row gap-2">
                    <label htmlFor="public">Is dashboard public: </label>
                    <input id="public" name="public" type="checkbox" className="border p-1" />
                </div>
                <button className="bg-indigo-500 text-white p-1 my-1 rounded" type="submit" disabled={submited}>{submitButtonText}</button>
            </form>
        </>
    )
}