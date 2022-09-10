import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo, useContext } from "react";
import DashboardCard from "../../components/DashboardCard";
import useApiService from '../../hooks/useApiService'

const pageSize = 10

export default function Dashboards() {
    const router = useRouter()
    const { term } = router.query

    const [total, setTotal] = useState(0)
    const [results, setResults] = useState([])
    const { searchDashboards } = useApiService()

    const [page, setPage] = useState(1)
    const totalPages = useMemo(() => Math.ceil(total / pageSize), [total])
    const skip = useMemo(() => (page - 1) * pageSize, [total])

    useEffect(() => {
        if (router.isReady) searchDashboards(term, pageSize, skip).then(response => {
            if (response) {
                setTotal(response.total)
                setResults(response.hits)
            }
        })
    }, [term, page])

    return (
        <>
            <Head>
                <title>Dashboards</title>
            </Head>
            <div className="container mx-auto flex flex-col items-center gap-2">
                {
                    results.map(result => <div key={result.id} className="w-2/3"><DashboardCard dashboardMetadata={result} /></div>)
                }
                <div className="w1/2"></div>
            </div>
        </>
    )
}