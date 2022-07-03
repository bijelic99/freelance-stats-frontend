import useMeasure from 'react-use-measure'
import { ResponsiveContainer, PieChart as RCPieChart, Pie, Legend, Tooltip, Cell } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function PieChart({ chart, chartData }) {

    const [divRef, divBounds] = useMeasure()

    return (
        <div className="border border-black rounded-md shadow-md p-1 h-full flex flex-col bg-white overflow-auto">
            <h2 className='self-center mb-2'>{chart.name}</h2>
            <div className="grid grid-cols-2 justify-items-center gap-x-1">
                {chart.dateFrom && <><span>From:</span><span>{chart.dateFrom}</span></> }
                {chart.dateTo && <><span>To:</span><span>{chart.dateTo}</span></>}
                <span>Type:</span><span>{chart.dataType}</span>
            </div>
            <div className="grow" ref={divRef}>
                <ResponsiveContainer width={divBounds.width} height="100%">
                    <RCPieChart>
                        <Legend />
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
        </div>
    )
}