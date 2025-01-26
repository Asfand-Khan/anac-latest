import { AreaChart, ResponsiveContainer, Area, Tooltip } from "recharts";

interface AreaStatsChartProps {
    data: { value: number }[];
    color: string;
}

const AreaStatsChart = ({ data, color }: AreaStatsChartProps) => {
    const gradientId = `gradient-${color.replace("#", "")}`;

    return (
        <ResponsiveContainer width="100%" height={60}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2}
                    fill={`url(#${gradientId})`}
                />
                <Tooltip
                    contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
                    labelStyle={{ color: "#666" }}
                    formatter={(value: number) => [`${value}`, "Value"]}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default AreaStatsChart;
