export default function LineChartForm({ chartMetadata, chart }) {

    return (
        <>
            <label htmlFor="dataType">Choose data you want to show:</label>
            <select id="dataType" name="dataType" className="border p-1" required defaultValue={chart?.dataType || null}>
                {
                    chartMetadata.dataTypes.map((tpe, i) => <option key={i} value={tpe}>{tpe}</option>)
                }
            </select>
            <label htmlFor="interval">Choose intervals in which to show data:</label>
            <select id="interval" name="interval" className="border p-1" required defaultValue={chart?.interval || null}>
                {
                    chartMetadata.intervals.map((interval, i) => <option key={i} value={interval}>{interval}</option>)
                }
            </select>
        </>
    )
}