import { useReducer, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {PieChartForm} from "./PieChartForm";
import charts from "../../staticValues/charts";

function chartFromForm(chartForm) {
    switch (chartForm.chartType) {
        case 'pie':
            return {
                name: chartForm.name,
                type: chartForm.chartType,
                dateFrom: chartForm.dateFrom,
                dateTo: chartForm.toNow ? null : chartForm.dateTo,
                data: [],
                positionData: {
                    w: Number.parseInt(chartForm.width),
                    h: Number.parseInt(chartForm.height),
                    isResizable: false,
                    maxW: 4,
                    maxH: 4
                }
            }
        default:
            throw new Error(`Unsupported chartType: ${chartForm.chartType}`)
    }
}

function chartReducerFunction(state, action) {
    switch (action.type) {
        case 'FORM_SUBMIT':
            return { isSubmited: true, chart: chartFromForm(action.payload) }
        case 'FORM_RESET':
            return { isSubmited: false, chart: {} }
        default:
            throw new Error(`Unsuported action '${action.type}'`)
    }
}

export default function ChartForm({ addChart }) {
    const [chartForm, dispatch] = useReducer(chartReducerFunction, { isSubmited: false, chart: {} })

    const { register, handleSubmit, watch, unregister, reset } = useForm();

    const [lastChartType, setLastChartType] = useState(charts[0].id)

    const formSubmit = useCallback(
        payload => {
            dispatch({ type: 'FORM_SUBMIT', payload })
            console.debug("Form submited")
        }, [dispatch, chartForm]
    )

    const resetChart = useCallback(() => {
        dispatch({ type: 'FORM_RESET' })
        reset()
    }, [dispatch, reset])

    useEffect(
        () => {
            if (chartForm.isSubmited) {
                addChart(chartForm.chart)
                resetChart()
                console.debug(chartForm)
            }
        }, [chartForm.isSubmited, resetChart]
    )

    const pieChartRef = useRef()

    useEffect(() => {
        const { unsubscribe } = watch((data, { name, type }) => {
            if(name === 'chartType' && type === 'change' && data.chartType !== lastChartType) {
                if(lastChartType === 'pie') pieChartRef.current.unregister()
                setLastChartType(data.chartType)
            }
        })
        return () => unsubscribe()
    }, [watch, lastChartType, setLastChartType])

    

    return (
        <>
            <form className="flex flex-col gap-1 px-2 py-2" onSubmit={handleSubmit(formSubmit)}>
                <label htmlFor="name">Name: </label>
                <input id="name" type="text" className="border p-1" {...register("name", { required: true })} />
                <label htmlFor="dateFrom">Date from: </label>
                <input id="dateFrom" type="datetime-local" className="border p-1" {...register("dateFrom", { required: true })} />
                <label htmlFor="toNow">To now: </label>
                <input id="toNow" type="checkbox" className="border p-1" {...register("toNow")} />
                <label htmlFor="dateTo">Date to: </label>
                <input id="dateTo" disabled={watch("toNow")} type="datetime-local" className="border p-1" {...register("dateTo", { required: !watch("toNow") })} />
                <label htmlFor="width">Width: </label>
                <input id="width" min={2} max={5} type="number" className="border p-1" {...register("width", { required: true })} />
                <label htmlFor="height">Height: </label>
                <input id="height" type="number" min={2} max={5} className="border p-1" {...register("height", { required: true })} />
                <label htmlFor="chartType">Type:</label>
                <select id="chartType" className="border p-1" {...register("chartType", { required: true })} >
                    {
                        charts.map(chart => <option key={chart.id} value={chart.id}>{chart.name}</option>)
                    }
                </select>
                {watch("chartType") == 'pie' && <PieChartForm ref={pieChartRef} register={register} unregister={unregister} />}
                <button type="submit">Add chart</button>
            </form>
        </>
    )
} 