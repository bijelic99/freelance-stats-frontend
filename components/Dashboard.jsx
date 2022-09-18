import PieChart from "./charts/PieChart";
import { useCallback, useState, useEffect, useMemo, useContext } from 'react'
import GridLayout from "react-grid-layout";
import useMeasure from "react-use-measure";
import Link from 'next/link'
import { useRouter } from 'next/router'
import Chart from "./charts/Chart";
import { Dialog, Switch } from "@headlessui/react";
import { getChartVisualizationDataLimits } from "../utils/chartsMetadataUtils";
import useApiService from "../hooks/useApiService";
import { UserManagementContext } from "../contexts/userManagementContext";
import { toast } from "react-toastify";

const columns = 5

export default function Dashboard({ dashboard, chartsMetadata }) {
    const router = useRouter()

    const [cachedDashboard, setCachedDashboard] = useState(dashboard)
    const [dashboardId, setDashboardId] = useState(null)
    const [dashboardData, setDashboardData] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [edit, setEdit] = useState(false)
    const { user } = useContext(UserManagementContext)
    const [isDeleteDialogOpened, setIsDeleteDialogOpened] = useState(false)

    const { getChartData, updateVisualizationData: updateVisualizationDataBE, deleteDashboard } = useApiService()

    const charts = useMemo(() => cachedDashboard?.charts || [], [cachedDashboard, edit])

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

    const updateVisualizationData = useCallback(async (layout) => {
        if (dashboardId && layout) {
            const visualizationData = Object.fromEntries(layout.map(l => {
                const { i, ...visualizationData } = l
                const id = i.split('+')[0]
                return [id, visualizationData]
            }))
            const updatedDashboard = await updateVisualizationDataBE(dashboardId, visualizationData)
            setCachedDashboard(updatedDashboard)
        }
    }, [dashboardId, setCachedDashboard])

    const deleteDashboardEvent = useCallback(() => {
        if (dashboardId) {
            const response = deleteDashboard(dashboardId)

            response.then(() => router.push("/"))

            toast.promise(
                response,
                {
                    pending: 'Deleting the dashboard',
                    success: 'Successfully deleted the dashboard',
                    error: 'Unexpected error while deleteing the dashboard'
                }
            )
        }
    }, [dashboardId, deleteDashboard, router])

    return (
        <>
            {
                error && <div>Unexpected error happened</div>
            }
            <div className="border border-black rounded-md shadow-md p-1 px-4 mb-2 flex flex-row justify-between">
                <div className="m-1 w-full flex flex-row justify-between items-center">
                    <div className="flex flex-row p-1 gap-1">
                        <span>{cachedDashboard.public ? "Public" : "Private"} dashboard: </span>
                        <h2>{cachedDashboard.name}</h2>
                    </div>
                    {user?.id && cachedDashboard.ownerId == user.id && <div className="flex flex-row p-1 gap-2 items-center">
                        <Link href={`/dashboard/${cachedDashboard.id}/chart/create`}>Add chart</Link>
                        <Link href={`/dashboard/${cachedDashboard.id}/edit`}>Edit dashboard</Link>
                        <button onClick={() => setIsDeleteDialogOpened(true)}>Delete dashboard</button>
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
                    </div>}

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
            <Dialog as="div" className="absolute left-0 top-0 z-10 w-full h-full flex flex-row justify-center items-center bg-slate-300/75" open={isDeleteDialogOpened} onClose={() => setIsDeleteDialogOpened(false)}>
                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
                    <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">Delete dashboard</Dialog.Title>
                    <Dialog.Description>
                        This will delete dashboard named: {cachedDashboard.name}
                    </Dialog.Description>

                    <p>
                        Are you sure you want to delete dashboard named: {cachedDashboard.name}
                    </p>
                    <div className="flex flex-row w-full gap-2">
                        <button onClick={deleteDashboardEvent}>Yes</button>
                        <button onClick={() => setIsDeleteDialogOpened(false)}>No</button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </>
    )
}