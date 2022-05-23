import { useMemo, useImperativeHandle, forwardRef } from "react"
import charts from "../../staticValues/charts";

export const PieChartForm = forwardRef(({ register, unregister }, ref) => {
    const dataTypes = useMemo(
        () => charts.find(chart => chart.id === "pie")?.chartData || [],
        [charts]
    )

    useImperativeHandle(ref, () => ({
        unregister: () => {
            unregister("chartData")
            console.debug("Unregistered from pie chart")
        }
    }), [unregister])

    return (
        <>
            <label htmlFor="chartData">Choose data you want to show:</label>
            <select id="chartData" className="border p-1" {...register("chartData", { required: true })} >
                {
                    dataTypes.map(dataType => <option key={dataType.id} value={dataType.id}>{dataType.name}</option>)
                }
            </select>
        </>
    )
})