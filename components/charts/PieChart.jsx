import { } from 'react'
import { ResponsiveContainer, PieChart as RCPieChart, Pie, Legend, Tooltip } from 'recharts'

export default function PieChart({ chart, editMode }) {

    return (
        <div className="border border-black rounded-md shadow-md p-1 h-full flex flex-col">
            <h2 className='self-center'>{chart.name}</h2>
            <div className='grow'>
                <ResponsiveContainer>
                    <RCPieChart>
                        <Legend />
                        <Tooltip />
                        <Pie data={chart.data} dataKey="value" nameKey="name" label labelLine={false} />
                    </RCPieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}