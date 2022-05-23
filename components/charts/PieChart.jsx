import { } from 'react'
import useMeasure from 'react-use-measure'
import { ResponsiveContainer, PieChart as RCPieChart, Pie, Legend, Tooltip, Cell } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function PieChart({ chart, editMode }) {

    const [divRef, divBounds] = useMeasure()

    return (
        <div className="border border-black rounded-md shadow-md p-1 h-full flex flex-col bg-white overflow-auto">
            <h2 className='self-center mb-2'>{chart.name}</h2>
            <div className="grid grid-cols-2 justify-items-center gap-x-1">
                <span>From:</span><span>{chart.dateFrom}</span>
                <span>To:</span><span>{chart.dateTo || 'now'}</span>
            </div>
            <div className="grow" ref={divRef}>
                <ResponsiveContainer width={divBounds.width} height={divBounds.height}>
                    <RCPieChart>
                        <Legend />
                        <Tooltip />
                        <Pie fill="#8884d8" data={chart.data} dataKey="value" nameKey="name">
                            {
                                chart.data.map((entry, index) => (
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