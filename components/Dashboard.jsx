import PieChart from "./charts/PieChart";
import { useState, useCallback, useReducer } from 'react'
import GridLayout from "react-grid-layout";
import useMeasure from "react-use-measure";

const dbrd = {
    id: "a68bde74-7261-4696-9bbb-7c185d072a46",
    name: "Test dashboard",
    charts: [
        {
            id: "58580b80-69b9-45aa-855c-0c2ec0cb59a3",
            name: "Work type pie chart",
            type: "pie",
            dateFrom: "2022-05-21T16:07",
            dateTo: "2022-05-21T16:07",
            data: [
                { name: 'Remote', value: 75 },
                { name: 'On site', value: 25 }
            ],
            positionData: {
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                isResizable: false,
                maxW: 4,
                maxH: 4
            }
        },
        {
            id: "58580b80-69b9-45aa-855c-0c2ec0cb59a4",
            name: "Timezone pie chart",
            type: "pie",
            dateFrom: "2022-05-21T16:07",
            dateTo: '',
            data: [
                { name: 'GMT', value: 50 },
                { name: 'GMT+1', value: 25 },
                { name: 'GMT+2', value: 25 }
            ],
            positionData: {
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                isResizable: false,
                maxW: 4,
                maxH: 4
            }
        }
    ]
}

const columns = 5

function getXY(charts, newChartWidth) {
    const maxY = Math.max(...(charts.map(c => c.positionData.y)), 0)
    const lastRow = charts.filter(c => c.positionData.y === maxY)
    const maxX = Math.max(...(lastRow.map(c=>c.positionData.x)), 0)
    const maxXElem = lastRow.find(c => c.positionData.x === maxX)
    if(maxXElem) {
        const possibleX = maxX + maxXElem.positionData.w
        if((possibleX + newChartWidth) < columns) {
            return {x: possibleX, y: maxY}
        }
    }
    return {x: 0, y: maxY + 1}
}

function dashboardReducerFunction(state, action) {
    switch (action.type) {
        case 'addChart':
            const {x, y} = getXY(state.charts, action.payload.positionData.w)
            console.log(x, y)
            const chart = {
                ...action.payload,
                positionData: {
                    ...action.payload.positionData,
                    x: x,
                    y: y
                }
            }
            return { ...state, charts: [...state.charts, chart ] }
        default:
            throw new Error(`Unsuported action '${action.type}'`)
    }
}


export default function Dashboard({ editMode }) {
    const [dashboardRef, dashboardBounds] = useMeasure()

    const [dashboard, dispatch] = useReducer(dashboardReducerFunction, dbrd)

    const chartRender = useCallback(
        (chart, i) => {
            return (
                <div key={i} data-grid={chart.positionData}>
                    {
                        chart.type === 'pie' && <PieChart chart={chart} editMode={editMode} />
                    }
                </div>
            )
        }, [editMode]
    )

    const addChart = useCallback(
        (chart) => {
            dispatch({ type: 'addChart', payload: chart })
        }
    )

    return (
        <>
            {
                !editMode && (
                    <div className="border border-black rounded-md shadow-md p-1 px-4 mb-2 flex flex-row justify-between">
                        <div className="m-1">
                            <h2 className="p-1">{dashboard.name}</h2>
                        </div>
                    </div>
                )
            }
            {
                editMode && (
                    <>
                        <form className="border border-black rounded-md shadow-md p-1 px-4 mb-2 flex flex-row justify-between">
                            <div className="m-1 flex">
                                <input className="p-1" type='text' defaultValue={dashboard.name} />
                            </div>
                            <div className="flex flex-row gap-2">
                                <button type="submit">Save changes</button>
                            </div>
                        </form>
                    </>
                )
            }
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