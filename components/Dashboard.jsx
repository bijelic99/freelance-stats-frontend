import PieChart from "./charts/PieChart";
import { useCallback, useState, useEffect, useMemo } from 'react'
import GridLayout from "react-grid-layout";
import useMeasure from "react-use-measure";
import Link from 'next/link'
import { useRouter } from 'next/router'
import Chart from "./charts/Chart";
import { getChartData, updateVisualizationData as updateVisualizationDataBE } from "../services/apiService";
import { Switch } from "@headlessui/react";
import { getChartVisualizationDataLimits } from "../utils/chartsMetadataUtils";

const columns = 5

export default function Dashboard({ dashboard, chartsMetadata }) {
    const router = useRouter()

    const [dashboardId, setDashboardId] = useState(null)
    const [dashboardData, setDashboardData] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [edit, setEdit] = useState(false)

    const charts = useMemo(() => dashboard?.charts || [], [dashboard, edit])

    useEffect(() => {
        const dashboardId = router.query['dashboard-id']
        if (dashboardId) {
            setDashboardId(dashboardId)
            setLoading(true)
            getChartData(dashboardId)
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
    }, [router, setDashboardData, setLoading, setError, setDashboardId])

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

    const updateVisualizationData = useCallback(async (layout) => {
        if (dashboardId && layout) {
            const visualizationData = Object.fromEntries(layout.map(l => {
                const { i, ...visualizationData } = l
                const id = i.split('+')[0]
                return [id, visualizationData]
            }))
            await updateVisualizationDataBE(dashboardId, visualizationData)
        }
    }, [dashboardId])

    return (
        <>
            {
                error && <div>Unexpected error happened</div>
            }
            <div className="border border-black rounded-md shadow-md p-1 px-4 mb-2 flex flex-row justify-between">
                <div className="m-1 w-full flex flex-row justify-between items-center">
                    <div className="flex flex-row p-1 gap-1">
                        <span>{dashboard.public ? "Public" : "Private"} dashboard: </span>
                        <h2>{dashboard.name}</h2>
                    </div>
                    <div className="flex flex-row p-1 gap-2 items-center">
                        <Link href={`/dashboard/${dashboard.id}/chart/create`}>Add chart</Link>
                        <Link href={`/dashboard/${dashboard.id}/edit`}>Edit dashboard</Link>
                        <Link href={`/dashboard/${dashboard.id}/delete`}>Delete dashboard</Link>
                        <div className="flex flex-row gap-1 items-center"><span>Change placement:</span><Switch checked={edit} onChange={setEdit} className={`${edit ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex h-[38px]
           w-[74px] shrink-0 
           cursor-pointer rounded-full border-2 
           border-transparent transition-colors duration-200 ease-in-out
            focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <span className="sr-only">Change placement</span>
                            <span
                                aria-hidden="true"
                                className={`${edit ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                            />
                        </Switch></div>
                    </div>
                </div>
            </div>
            <div className="border border-black rounded-md shadow-md" ref={dashboardRef}>
                <GridLayout className="layout" cols={columns} width={dashboardBounds.width} onLayoutChange={updateVisualizationData}>
                    {
                        charts.map((chart) => (
                            <div key={`${chart.id}+${edit}`} data-grid={{ ...chart.visualizationData, ...getChartVisualizationDataLimits(chartsMetadata, chart._type), isResizable: edit, isDraggable: edit }}>
                                <Chart dashboardId={router.query['dashboard-id']} isLoading={isLoading} chart={chart} chartData={dashboardData[chart.id]} />
                            </div>
                        ))
                    }
                </GridLayout>
            </div>
        </>
    )
}