import PieChart from "./charts/PieChart";
import { useCallback } from 'react'
import GridLayout from "react-grid-layout";
import useMeasure from "react-use-measure";
import Link from 'next/link'

const columns = 5

export default function Dashboard({ dashboard }) {
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
                        dashboard.charts.map(chartRender)
                    }
                </GridLayout>
            </div>
        </>
    )
}