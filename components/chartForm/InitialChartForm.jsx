import charts from "../../staticValues/charts";
import { useForm } from "react-hook-form";

export default function InitialChartForm( { formSubmit }) {

    const { register, handleSubmit, watch } = useForm();

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
                <label htmlFor="chartType">Type:</label>
                <select id="chartType" className="border p-1" {...register("chartType", { required: true })} >
                    {
                        charts.map(chart => <option key={chart.id} value={chart.id}>{chart.name}</option>)
                    }
                </select>
                <button type="submit">Next page</button>
            </form>
        </>
    )
} 