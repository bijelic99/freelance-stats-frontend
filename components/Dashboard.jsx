import PieChart from "./charts/PieChart";
import { useCallback, useState, useEffect } from 'react'
import GridLayout from "react-grid-layout";
import useMeasure from "react-use-measure";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { cssOverride } from "../staticValues/loader-config";
import Chart from "./charts/Chart";

const columns = 5

export default function Dashboard({ dashboard }) {
    const router = useRouter()

    const [dashboardData, setDashboardData] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const dashboardId = router.query['dashboard-id']
        if (dashboardId) {
            setLoading(true)
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/${dashboardId}/chart-data`)
                .then(res => {
                    if (res.status === 200) {
                        return res.json()
                    }
                    else {
                        throw new Exception(`Server returned non 200 response: '${res.status}'`)
                    }
                })
                .then((data) => {
                    setDashboardData(data)
                    setLoading(false)
                    setError(false)
                })
                .catch((err) => {
                    console.error(err)
                    setError(true)
                    setLoading(false)
                })
        }
    }, [router, setDashboardData, setLoading, setError])

    const [dashboardRef, dashboardBounds] = useMeasure()

    const chartRender = useCallback(
        (chart, i) => {
            return (
                <div key={i} data-grid={chart.positionData}>
                    {
                        chart.type === 'pie' && <PieChart chart={chart} />
                    }
                </div>
            )
        }, []
    )

    return (
        <>
            {
                error && <div>Unexpected error happened</div>
            }
            <div className="border border-black rounded-md shadow-md p-1 px-4 mb-2 flex flex-row justify-between">
                <div className="m-1 w-full flex flex-row justify-between">
                    <div className="flex flex-row p-1 gap-1">
                        <span>{dashboard.public ? "Public" : "Private"} dashboard: </span>
                        <h2>{dashboard.name}</h2>
                    </div>
                    <div className="flex flex-row p-1 gap-2">
                        <Link href={`/dashboard/${dashboard.id}/chart/create`}>Add chart</Link>
                        <Link href={`/dashboard/${dashboard.id}/edit`}>Edit dashboard</Link>
                        <Link href={`/dashboard/${dashboard.id}/delete`}>Delete dashboard</Link>
                    </div>
                </div>
            </div>
            <div className="border border-black rounded-md shadow-md" ref={dashboardRef}>
                <GridLayout className="layout" cols={columns} width={dashboardBounds.width}>
                    {
                        dashboard.charts.map((chart, i) => (
                            <div key={i} data-grid={{...chart.visualizationData, isResizable: false}}>
                                <Chart dashboardId={router.query['dashboard-id']} isLoading={isLoading} chart={chart} chartData={dashboardData[chart.id]} />
                            </div>
                        ))
                    }
                </GridLayout>
            </div>
        </>
    )
}