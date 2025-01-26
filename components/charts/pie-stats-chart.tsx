"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface PieStatsChartProps {
    data: { name: string; value: number }[];
    colors: string[]; // Accept the colors array as a prop
}

const PieStatsChart: React.FC<PieStatsChartProps> = ({ data, colors }) => {
    return (
        <div className="w-full h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                        itemStyle={{ color: "#333" }}
                        formatter={(value: number, name: string) => [`${value}`, `${name}`]}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieStatsChart;
