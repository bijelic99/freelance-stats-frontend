import { useMemo } from 'react';
import useMeasure from 'react-use-measure'
import { ResponsiveContainer, Tooltip, ScatterChart, XAxis, YAxis, ZAxis, Scatter } from 'recharts'

export function BubbleChart({ chart, chartData }) {

    const [divRef, divBounds] = useMeasure()

    const transformedData = useMemo(()=>chartData.data.map(d => { return {index: 1, ...d} }), [chartData.data])

    const renderTooltip = ({ active, payload }) => {

        if (active && payload && payload.length) {
            const data = payload[0] && payload[0].payload;

            return (
                <div
                    style={{
                        backgroundColor: '#fff',
                        border: '1px solid #999',
                        margin: 0,
                        padding: 10,
                    }}
                >
                    <p>{data.key}</p>
                    <p>
                        <span>value: </span>
                        {data.value}
                    </p>
                </div>
            );
        }

        return null;
    };

    const domain = useMemo(()=>{
        return [
            0,
            Math.max(
                chartData.data.map(x=>x.value)
            )
        ]
    }, [chartData.data])

    return (
        <div className="grow flex flex-col justify-center mx-2" ref={divRef}>
            <ResponsiveContainer width={divBounds.width} height={100}>
                <ScatterChart
                    width={800}
                    height={60}
                    margin={{
                        top: 20,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    }}
                >
                    <XAxis
                        type="category"
                        dataKey="key"
                        interval={0}
                        tickLine={{ transform: 'translate(0, -6)' }}
                    />
                    <YAxis
                        type="number"
                        dataKey="index"
                        name="chart.dataType"
                        height={0}
                        width={0}
                        tick={false}
                        tickLine={false}
                        axisLine={false}
                    />
                    <ZAxis
                        type='number'
                        dataKey="value"
                        domain={domain}
                        range={[25, 200]}
                        />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
                    <Scatter data={transformedData} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    )
}

export function BubbleChartInfo({ chart }) {
    return (
        <>
            <div className="flex flex-row justify-between"><span>Chart type:</span><span>Bubble chart</span></div>
            <div className="flex flex-row justify-between"><span>Data type:</span><span>{chart.dataType}</span></div>
            <div className="flex flex-row justify-between"><span>Source:</span><span>{chart?.source ? chart.source : "All"}</span></div>
            {chart?.dateFrom && <><span>From:</span><span>{chart.dateFrom}</span></>}
            {chart?.dateTo && <><span>To:</span><span>{chart.dateTo}</span></>}
        </>
    )
}