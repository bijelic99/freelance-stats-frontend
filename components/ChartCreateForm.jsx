import charts from "../staticValues/charts";

export default function ChartCreateForm() {
    return (
        <>
            <form className="flex flex-col gap-1 px-2 py-2">
                <label htmlFor="date-from">Date from: </label>
                <input id="date-from" type="datetime-local" className="border p-1"/>
                <label htmlFor="date-to">Date to: </label>
                <input id="date-to" type="datetime-local" className="border p-1"/>
                <label htmlFor="type">Type:</label>
                <select id="type" className="border p-1">
                    {
                        charts.map(chart => <option id={chart.id} value={chart.id}>{chart.name}</option>)
                    }
                </select>
                
                <button type="submit">Next page</button>
            </form>
        </>
    )
} 