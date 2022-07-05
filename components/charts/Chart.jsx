import ClipLoader from "react-spinners/ClipLoader";
import { cssOverride } from "../../staticValues/loader-config";
import { PieChart, PieChartInfo } from "./PieChart";
import ChartHeading from "./ChartHeading";
import { useCallback, useState } from "react";
import Link from 'next/link'

export default function Chart({ dashboardId, chart, chartData, isLoading }) {
    const [showInfo, setShowInfo] = useState(false)
    const [showModify, setShowModify] = useState(false)

    const infoHover = useCallback(() => {
        setShowInfo(true)
        setShowModify(false)
    }, [setShowInfo, setShowModify])
    const modifyHover = useCallback(() => {
        setShowModify(true)
        setShowInfo(false)
    }, [setShowModify, setShowInfo])

    const infoMouseLeave = useCallback(() => { setShowInfo(false) }, [setShowInfo])
    const modifyMouseLeave = useCallback(() => { setShowModify(false) }, [setShowModify])
    const componentMouseLeave = useCallback(() => {
        setShowModify(false)
        setShowInfo(false)
    }, [setShowModify, setShowInfo])

    return (
        <>
            <div className="border border-black rounded-md shadow-md p-1 h-full flex flex-col bg-white overflow-auto" onMouseLeave={componentMouseLeave}>
                <ClipLoader loading={isLoading} cssOverride={cssOverride} />
                {
                    chartData && <>
                        <ChartHeading infoOnHover={infoHover} modifyOnHover={modifyHover} chart={chart} showModify />
                    </>
                }
                {
                    !showInfo && !showModify && chartData && <>
                        {
                            chart._type === "model.PieChart" && <PieChart chart={chart} chartData={chartData} />
                        }
                    </>
                }
                {
                    showInfo && <div className="grow flex flex-col justify-center px-8" onMouseLeave={modifyMouseLeave}>
                        {
                            chart._type === "model.PieChart" && <PieChartInfo chart={chart} />
                        }
                    </div>
                }
                {
                    showModify && <div className="grow flex flex-col items-center justify-center" onMouseLeave={modifyMouseLeave}>
                        <Link href={`/dashboard/${dashboardId}/charts/${chart.id}/edit`}>Edit</Link>
                        <Link href={`/dashboard/${dashboardId}/charts/${chart.id}/delete`}>Delete</Link>
                    </div>
                }
            </div>
        </>
    )
}