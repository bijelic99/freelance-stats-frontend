import { useCallback, useMemo, useState } from "react"
import PieChartForm2 from "./PieChartForm2"

const newChart = {
    name: "",
    dateFrom: null,
    dateTo: null,
    source: null
}

export default function ChartForm2({ chartsMetadata, sources, submitForm, chart = newChart }) {

    const [selectedType, setSelectedType ] = useState(Object.entries(chartsMetadata)[0][1]?.class)

    const _typeOnChange = useCallback((e) => {
        e.preventDefault()
        setSelectedType(e.target.value)
    }, [setSelectedType])

    const selectedChart = useMemo(() => {
        return Object.values(chartsMetadata).find(value => value.class === selectedType)
    }, [selectedType, chartsMetadata])

    const transformInput = useCallback(
        (e) => {
            e.preventDefault()
            console.log(e.target)
            const formData = new FormData(e.target)
            console.log(Object.fromEntries(formData.entries()))
        }, [submitForm]
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
                    <option key={'all'} value={''}>All</option>
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
                    selectedType === "model.PieChart" && <PieChartForm2 chartMetadata={selectedChart}/>
                }
                <button type="submit">Add chart</button>
            </form>
        </>
    )
}