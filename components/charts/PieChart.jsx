import useMeasure from 'react-use-measure'
import { ResponsiveContainer, PieChart as RCPieChart, Pie, Legend, Tooltip, Cell } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function PieChart({ chart, chartData }) {

    const [divRef, divBounds] = useMeasure()

    return (
        <div className="grow" ref={divRef}>
            <ResponsiveContainer width={divBounds.width} height="100%">
                <RCPieChart>
                    { chartData.data.length <= 5 && <Legend /> }
                    <Tooltip />
                    <Pie fill="#8884d8" data={chartData.data} dataKey="value" nameKey="name">
                        {
                            chartData.data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))
                        }
                    </Pie>
                </RCPieChart>
            </ResponsiveContainer>
        </div>
    )
}

export function PieChartInfo({ chart }) {
    return (
        <>
            <div className="flex flex-row justify-between"><span>Chart type:</span><span>Pie chart</span></div>
            <div className="flex flex-row justify-between"><span>Data type:</span><span>{chart.dataType}</span></div>
            <div className="flex flex-row justify-between"><span>Source:</span><span>{chart?.source ? chart.soure : "All"}</span></div>
            { chart?.dateFrom && <><span>From:</span><span>{chart.dateFrom}</span></> }
            { chart?.dateTo && <><span>To:</span><span>{chart.dateTo}</span></> }
        </>
    )
}