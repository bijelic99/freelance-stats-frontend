import ClipLoader from "react-spinners/ClipLoader";
import { cssOverride } from "../../staticValues/loader-config";
import { PieChart, PieChartInfo } from "./PieChart";
import { BubbleChart, BubbleChartInfo } from "./BubbleChart";
import ChartHeading from "./ChartHeading";
import { useCallback, useState } from "react";
import Link from 'next/link'
import { LineChart, LineChartInfo } from "./LineChart";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import useApiService from "../../hooks/useApiService";
import { useRouter } from "next/router";

export default function Chart({ dashboardId, chart, chartData, isLoading }) {
    const [showInfo, setShowInfo] = useState(false)
    const [showModify, setShowModify] = useState(false)
    const [isDeleteDialogOpened, setIsDeleteDialogOpened] = useState(false)
    const router = useRouter()
    
    const { deleteChart } = useApiService()

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

    const deleteChartEvent = useCallback(() => {
        if (dashboardId && chart.id) {
            const response = deleteChart(dashboardId, chart.id)

            response.then(() => router.push("/"))

            toast.promise(
                response,
                {
                    pending: 'Deleting the chart',
                    success: 'Successfully deleted the chart',
                    error: 'Unexpected error while deleteing the chart'
                }
            )
        }
    }, [dashboardId, chart.id, deleteChart, router])

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
                        {
                            chart._type === "model.BubbleChart" && <BubbleChart chart={chart} chartData={chartData} />
                        }
                        {
                            chart._type === "model.LineChart" && <LineChart chart={chart} chartData={chartData} />
                        }
                    </>
                }
                {
                    showInfo && <div className="grow flex flex-col justify-center px-8" onMouseLeave={modifyMouseLeave}>
                        {
                            chart._type === "model.PieChart" && <PieChartInfo chart={chart} />
                        }
                        {
                            chart._type === "model.BubbleChart" && <BubbleChartInfo chart={chart} />
                        }
                        {
                            chart._type === "model.LineChart" && <LineChartInfo chart={chart} />
                        }
                    </div>
                }
                {
                    showModify && <div className="grow flex flex-col items-center justify-center" onMouseLeave={modifyMouseLeave}>
                        <Link href={`/dashboard/${dashboardId}/chart/${chart.id}/edit`}>Edit</Link>
                        <button onClick={() => setIsDeleteDialogOpened(true)}>Delete</button>
                    </div>
                }
            </div>
            <Dialog as="div" className="absolute left-0 top-0 z-10 w-full h-full flex flex-row justify-center items-center bg-slate-300/75" open={isDeleteDialogOpened} onClose={() => setIsDeleteDialogOpened(false)}>
                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
                    <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">Delete chart</Dialog.Title>
                    <Dialog.Description>
                        This will delete chart named: {chart.name}
                    </Dialog.Description>

                    <p>
                        Are you sure you want to delete chart named: {chart.name}
                    </p>
                    <div className="flex flex-row w-full gap-2">
                        <button onClick={deleteChartEvent}>Yes</button>
                        <button onClick={() => setIsDeleteDialogOpened(false)}>No</button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </>
    )
}