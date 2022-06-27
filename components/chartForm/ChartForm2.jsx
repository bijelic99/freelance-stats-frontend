import { useCallback } from "react"

const newChart = {
    name: "",
    dateFrom: null,
    dateTo: null,
    source: null
}

export default function ChartForm2({ chartsMetadata, sources, submitForm, chart = newChart }) {

    const transformInput = useCallback(
        (e) => {
            e.preventDefault()
            console.log(e.target.elements)
        }, [submitForm]
    )

    return (
        <>
            <form className="flex flex-col gap-1 px-2 py-2" onSubmit={transformInput}>
                <label htmlFor="name">Name: </label>
                <input id="name" type="text" className="border p-1" defaultValue={chart.name}/>
                <label htmlFor="dateFrom">Date from: </label>
                <input id="dateFrom" type="datetime-local" className="border p-1" defaultValue={chart.dateFrom}/>
                <label htmlFor="dateTo">Date from: </label>
                <input id="dateTo" type="datetime-local" className="border p-1" defaultValue={chart.dateTo}/>
                <label htmlFor="source">Source: </label>
                <select id="source" className="border p-1" defaultValue={chart.source}>
                    <option key={'all'} value={null}>All</option>
                    {
                        sources.map(source => <option key={source.id} value={source.id}>{source.name}</option>)
                    }
                </select>
                <label htmlFor="width">Width: </label>
                <input id="width" type="number" className="border p-1"/>
                <label htmlFor="height">Height: </label>
                <input id="height" type="number" className="border p-1"/>
                <label htmlFor="_type">Chart: </label>
                <select id="_type" className="border p-1">
                    {
                        chartsMetadata.map(cm => <option key={cm.id} value={cm.class}>{cm.name}</option>)
                    }
                </select>
                <button type="submit">Add chart</button>
            </form>
        </>
    )
}