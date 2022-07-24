import { useMemo } from 'react';
import useMeasure from 'react-use-measure'
import { ResponsiveContainer, Tooltip, Line, XAxis, YAxis, LineChart as LC, CartesianGrid, Legend } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function LineChart({ chart, chartData }) {

    const [divRef, divBounds] = useMeasure()
    const transformedData = useMemo(() => chartData.data.map(d => { return { key: d.key, ...d.values } }), [chartData.data])
    const lines = useMemo(() => [...new Set(transformedData.flatMap(Object.keys).filter(key => key !== "key"))], [transformedData])
    return (
        <div className="grow flex flex-col justify-center mx-2" ref={divRef}>
            <ResponsiveContainer width={divBounds.width} height={100}>
                <LC width={divBounds.width} height={100} data={transformedData} margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="key" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {
                        lines.map((line, i) => <Line type='monotone' dataKey={line} stroke={COLORS[i % COLORS.length]} />)
                    }
                </LC>
            </ResponsiveContainer>
        </div>
    )
}

export function LineChartInfo({ chart }) {
    return (
        <>
            <div className="flex flex-row justify-between"><span>Chart type:</span><span>Line chart</span></div>
            <div className="flex flex-row justify-between"><span>Data type:</span><span>{chart.dataType}</span></div>
            <div className="flex flex-row justify-between"><span>Data interval:</span><span>{chart.interval}</span></div>
            <div className="flex flex-row justify-between"><span>Source:</span><span>{chart?.source ? chart.source : "All"}</span></div>
            {chart?.dateFrom && <><span>From:</span><span>{chart.dateFrom}</span></>}
            {chart?.dateTo && <><span>To:</span><span>{chart.dateTo}</span></>}
        </>
    )
}