import React from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, Tooltip, Cell, Rectangle } from 'recharts'
import { monthlyDataTypes } from "@/types/types"

interface BarStatsChartProps {
    data: monthlyDataTypes[]
}

const BarStatsChart: React.FC<BarStatsChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis
                    dataKey="month"
                    stroke="#5b6770"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip
                    contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
                    labelStyle={{ color: "#666" }}
                    formatter={(value: number) => [`${value}`, "Value"]}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} activeBar={<Rectangle fill="#c26c8a" stroke="#c26c8a" />}>
                    {data.map((index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={"#e38ca2"}

                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarStatsChart
