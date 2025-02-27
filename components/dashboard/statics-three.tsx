"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import PieStatsChart from "../charts/pie-stats-chart";
import { Skeleton } from "../ui/skeleton";

const charts = [
    {
        title: "Delivery Status",
        data: [
            { name: "Delivered", value: 2800 },
            { name: "Cancelled", value: 936 },
        ],
        total: 768,
        colors: ["#0074fc", "#FF5C58"],
    },
    {
        title: "Return Status",
        data: [
            { name: "Returned", value: 1200 },
            { name: "Not Returned", value: 800 },
        ],
        total: 2000,
        colors: ["#34D399", "#F87171"],
    },
    {
        title: "Payment Status",
        data: [
            { name: "Paid", value: 5000 },
            { name: "Unpaid", value: 1500 },
        ],
        total: 6500,
        colors: ["#FBBF24", "#6B7280"],
    },
    {
        title: "Stock Status",
        data: [
            { name: "In Stock", value: 3000 },
            { name: "Out of Stock", value: 1200 },
        ],
        total: 4200,
        colors: ["#4ADE80", "#F87171"],
    },
];

const StaticsThree = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Card className="w-full shadow-none border-0">
            {/* Card Header */}
            <CardHeader className="border-b py-4">
                <CardTitle className="text-lg font-semibold">Sample Overview</CardTitle>
            </CardHeader>

            {/* Card Content */}
            <CardContent>
                <div className="pt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                    {charts.map((chart, index) => (
                        <Card className="shadow-md" key={index}>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-gray-700">
                                    {chart.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative">
                                {loading ? (
                                    <Skeleton className="h-32 w-full" />
                                ) : (
                                    <>
                                        <PieStatsChart data={chart.data} colors={chart.colors} />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <p className="text-sm font-medium">Total</p>
                                            <p className="text-2xl font-bold">{chart.total}</p>
                                        </div>
                                    </>
                                )}
                                <div className="flex justify-between gap-4 mt-4">
                                    {chart.data.map((item, idx) => (
                                        <div className="flex items-center gap-2" key={idx}>
                                            <div
                                                className="h-3 w-3 rounded-full"
                                                style={{ backgroundColor: chart.colors[idx] }}
                                            />
                                            <span className="text-sm text-muted-foreground">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default StaticsThree;
