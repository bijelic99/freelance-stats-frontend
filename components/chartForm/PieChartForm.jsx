import { useMemo } from "react"
import charts from "../../staticValues/charts";
import { useForm } from "react-hook-form";

export default function PieChartForm({ goToInitialForm, formSubmit }) {
    
    const dataTypes = useMemo(
        () => charts.find(chart => chart.id === "pie")?.chartData || [],
        [charts]
    )

    const { register, handleSubmit } = useForm();
    
    return (
        <>
            <form className="flex flex-col gap-1 px-2 py-2" onSubmit={handleSubmit(formSubmit)}>
                <label htmlFor="width">Width: </label>
                <input id="width" min={2} max={5} type="number" className="border p-1" {...register("width", { required: true })} />
                <label htmlFor="height">Height: </label>
                <input id="height" type="number" min={2} max={5} className="border p-1" {...register("height", { required: true })} />
                <label htmlFor="chartData">Choose data you want to show:</label>
                <select id="chartData" className="border p-1" {...register("chartData", { required: true })} >
                    {
                        dataTypes.map(dataType => <option key={dataType.id} value={dataType.id}>{dataType.name}</option>)
                    }
                </select>
                <div className="flex flex-row justify-between">
                    <button type="button" onClick={goToInitialForm}>Go back</button> 
                    <button type="submit">Add chart</button>
                </div>
                
            </form>        
        </>
    )
}