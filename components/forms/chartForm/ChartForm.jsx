import { useCallback, useMemo, useState } from "react"
import PieChartForm from "./PieChartForm"

const newChart = {
    name: "",
    dateFrom: "",
    dateTo: "",
    source: null,
    visualizationData: {
        x: 0,
        y: 0,
        w: 0,
        h: 0
    }
}

export default function ChartForm({ chartsMetadata, sources, submitForm, chart = newChart, submitButtonText = "Create chart" }) {

    const [submited, setSubmited] = useState(false)

    const [selectedType, setSelectedType ] = useState(Object.entries(chartsMetadata)[0][1]?.class)

    const _typeOnChange = useCallback((e) => {
        e.preventDefault()
        setSelectedType(e.target.value)
    }, [setSelectedType])

    const selectedChart = useMemo(() => {
        return Object.values(chartsMetadata).find(value => value.class === selectedType)
    }, [selectedType, chartsMetadata])

    const transformInput = useCallback(
        async (e) => {
            setSubmited(true)
            e.preventDefault()
            const formData = new FormData(e.target)
            const {width, height, source, dateFrom, dateTo, ...formObject} = Object.fromEntries(formData.entries())
            const transformedInput = {
                id: "",
                ...chart,
                ...formObject,
                source: source === 'all' ? null : source,
                dateFrom: dateFrom || null,
                dateTo: dateTo || null,
                visualizationData: {
                    ...chart.visualizationData,
                    w: Number.parseInt(width),
                    h: Number.parseInt(height)
                },
                
            }
            console.debug(transformedInput)
            submitForm(transformedInput)
            .then(() => {
                e.target.reset()
            })
            .catch(() => {
                setSubmited(false)
            })
        }, [submitForm, setSubmited]
    )

    return (
        <>
            <form className="flex flex-col gap-1 px-2 py-2" onSubmit={transformInput}>
                <label htmlFor="name">Name: </label>
                <input id="name" name="name" type="text" className="border p-1" defaultValue={chart.name} required/>
                <label htmlFor="dateFrom">Date from: </label>
                <input id="dateFrom" name="dateFrom" type="datetime-local" className="border p-1" defaultValue={chart.dateFrom}/>
                <label htmlFor="dateTo">Date from: </label>
                <input id="dateTo" name="dateTo" type="datetime-local" className="border p-1" defaultValue={chart.dateTo}/>
                <label htmlFor="source">Source: </label>
                <select id="source" name="source" className="border p-1" defaultValue={chart.source} required>
                    <option key={'all'} value={'all'}>All</option>
                    {
                        sources.map(source => <option key={source.id} value={source.id}>{source.name}</option>)
                    }
                </select>
                <label htmlFor="width">Width: </label>
                <input id="width" name="width" type="number" className="border p-1" min={selectedChart.visualizationLimits.minW} max={selectedChart.visualizationLimits.maxW} required/>
                <label htmlFor="height">Height: </label>
                <input id="height" name="height" type="number" className="border p-1" min={selectedChart.visualizationLimits.minH} max={selectedChart.visualizationLimits.maxH} required/>
                <label htmlFor="_type">Chart: </label>
                <select onChange={_typeOnChange} id="_type" name="_type" className="border p-1" required>
                    {
                        Object.entries(chartsMetadata).map(([id, cm]) => <option key={id} value={cm.class}>{cm.name}</option>)
                    }
                </select>
                {
                    selectedType === "model.PieChart" && <PieChartForm chartMetadata={selectedChart}/>
                }
                <button type="submit" disabled={submited}>{submitButtonText}</button>
            </form>
        </>
    )
}