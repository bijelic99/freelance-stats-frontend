import ChartForm from "./chartForm/ChartForm";
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
            dateTo: "2022-05-21T16:07",
            data: [
                { name: 'GMT', value: 50 },
                { name: 'GMT+1', value: 25 },
                { name: 'GMT+2', value: 25 }
            ],
            positionData: {
                x: 0,
                y: 2,
                w: 4,
                h: 4,
                isResizable: false,
                maxW: 4,
                maxH: 4
            }
        }
    ]
}

function dashboardReducerFunction(state, action) {
    switch (action.type) {
        default:
            throw new Error(`Unsuported action '${action.type}'`)
    }
}


export default function Dashboard({ editMode }) {
    const [dashboardRef, dashboardBounds] = useMeasure()

    const [dashboard, dispatch] = useReducer(dashboardReducerFunction, dbrd)

    const chartRender = useCallback(
        (chart) => {
            return (
                <div key={chart.id} data-grid={chart.positionData}>
                    {
                        chart.type === 'pie' && <PieChart chart={chart} editMode={editMode} />
                    }
                </div>
            )
        }, [editMode]
    )

    return (
        <>

            {
                editMode && (
                    <div className="border border-black rounded-md shadow-md p-1 mb-2">
                        <ChartForm />
                    </div>
                )
            }
            <div className="border border-black rounded-md shadow-md" ref={dashboardRef}>
                <GridLayout className="layout" cols={5} width={dashboardBounds.width} rowHeight={30}>
                    {
                        dashboard.charts.map(chartRender)
                    }
                </GridLayout>
            </div>
        </>
    )
}