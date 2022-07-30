import { Fragment, useCallback, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { searchDashboards } from '../../services/apiService'
import { useRouter } from 'next/router'

export default function Search() {

    const router = useRouter()

    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    useEffect(() => {
        if (query) {
            searchDashboards(query, 10, 0).then(response => setResults(response.hits))
        }
    }, [query, setResults])
    const openDashboard = useCallback((dashboard) => () => {
        if (dashboard && dashboard.id) router.push(`/dashboard/${dashboard.id}`)
    }, [router])

    const performDashboardSearch = useCallback(() => {
        if (query) router.push(`/dashboard?${(new URLSearchParams({term: query})).toString()}`)
    }, [query, router])

    return <Combobox className="w-96" value={query} onChange={setQuery}>
        <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                    className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                    displayValue={(q) => q}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2" onClick={performDashboardSearch}>
                    <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </Combobox.Button>
            </div>
            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('') || setResults([])}
            >
                <Combobox.Options className="absolute mt-1 max-h-60 w-96 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {results.length === 0 && query !== '' ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nothing found.
                        </div>
                    ) : (
                        results.map((dashboard) => (
                            <Combobox.Option
                                key={dashboard.id}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                    }`
                                }
                                onClick={openDashboard(dashboard)}
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{dashboard.name}</span>
                                    </>
                                )}
                            </Combobox.Option>
                        ))
                    )}
                </Combobox.Options>
            </Transition>
        </div>
    </Combobox>
}