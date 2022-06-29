export default function PieChartForm2({ chartMetadata }) {

    return (
        <>
            <label htmlFor="dataType">Choose data you want to show:</label>
            <select id="dataType" name="dataType" className="border p-1" required>
                {
                    chartMetadata.dataTypes.map((tpe, i) => <option key={i} value={tpe}>{tpe}</option>)
                }
            </select>
        </>
    )
}