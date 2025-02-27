"use client";
import type { MetricDataTypes, monthlyDataTypes } from "@/types/types";
import BarStatsChart from "../charts/bar-stats-chart";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ThumbsUp, DollarSign, Users } from 'lucide-react'
import MetricCard from "./metric-card";

const monthlyData: monthlyDataTypes[] = [
    { month: "Jan", value: 20, isHighlighted: true },
    { month: "Feb", value: 35, isHighlighted: true },
    { month: "Mar", value: 35, isHighlighted: true },
    { month: "Apr", value: 70, isHighlighted: false },
    { month: "May", value: 50, isHighlighted: false },
    { month: "Jun", value: 60, isHighlighted: false },
    { month: "Jul", value: 40, isHighlighted: true },
    { month: "Aug", value: 70, isHighlighted: false },
    { month: "Sep", value: 50, isHighlighted: false },
    { month: "Oct", value: 70, isHighlighted: false },
    { month: "Nov", value: 40, isHighlighted: true },
    { month: "Dec", value: 70, isHighlighted: false },
]

const metrics: MetricDataTypes[] = [
    {
        label: "Followers",
        value: "2.56M",
        change: 0.64,
        icon: <ThumbsUp className="h-4 w-4 text-blue-500" />,
    },
    {
        label: "Amount Spent",
        value: "$14,642",
        change: 0.64,
        icon: <DollarSign className="h-4 w-4 text-green-500" />,
    },
    {
        label: "Reach",
        value: "12,326",
        change: -5.31,
        icon: <Users className="h-4 w-4 text-purple-500" />,
    },
]

const StaticsTwo = () => {
    return (
        <Card className="w-full shadow-none border-0">
            <CardHeader className="border-b py-4">
                <CardTitle className="text-lg font-semibold">Sample Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="pt-6 grid gap-6 grid-cols-1 xl:grid-cols-2">
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                        {metrics.map((metric) => (
                            <MetricCard key={metric.label} {...metric} />
                        ))}
                    </div>
                    <BarStatsChart data={monthlyData} />
                </div>
            </CardContent>
        </Card>
    )
}

export default StaticsTwo;