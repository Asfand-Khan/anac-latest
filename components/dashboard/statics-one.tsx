"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LucideWaves, Package, Truck, Users } from "lucide-react";
import AreaStatsChart from "../charts/area-stats-chart";
import { Skeleton } from "@/components/ui/skeleton";

const franchisePerformance = [
    { value: 1000 },
    { value: 3000 },
    { value: 2000 },
    { value: 2780 },
    { value: 1890 },
    { value: 2390 },
    { value: 3490 },
];

const activeDeliveries = [
    { value: 1000 },
    { value: 2200 },
    { value: 1500 },
    { value: 2250 },
    { value: 3045 },
];

const deliveryPerformance = [
    { value: 60 },
    { value: 80 },
    { value: 97.8 },
    { value: 100 },
];

const deliveryStaffPerformance = [
    { value: 100 },
    { value: 200 },
    { value: 250 },
    { value: 500 },
    { value: 280 },
    { value: 320 },
    { value: 450 },
];

interface StatCardProps {
    title: string;
    icon: React.ReactElement;
    value: string;
    data: { value: number }[];
    color: string;
    isLoading: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, icon, value, data, color, isLoading }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">{title}</CardTitle>
                {React.cloneElement(icon, { className: `h-6 w-6 text-[${color}]` })}
            </CardHeader>
            <CardContent className={isLoading ? "" : "pb-0"}>
                {isLoading ? (
                    <>
                        <Skeleton className="h-8 w-20 mb-3" />
                        <Skeleton className="h-[60px] w-full" />
                    </>
                ) : (
                    <>
                        <div className="text-xl sm:text-2xl font-bold mb-3">{value}</div>
                        <AreaStatsChart data={data} color={color} />
                    </>
                )}
            </CardContent>
        </Card>
    );
};

const StaticsOne = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const stats = [
        {
            title: "Total Franchises",
            icon: <Package />,
            value: "559",
            data: franchisePerformance,
            color: "#8884d8"
        },
        {
            title: "Active Deliveries",
            icon: <Truck />,
            value: "2,345",
            data: activeDeliveries,
            color: "#36A2EB"
        },
        {
            title: "Delivery Staff",
            icon: <Users />,
            value: "350",
            data: deliveryStaffPerformance,
            color: "#FF6384"
        },
        {
            title: "On-Time Delivery Rate",
            icon: <LucideWaves />,
            value: "98.2%",
            data: deliveryPerformance,
            color: "#4BC0C0"
        }
    ];

    return (
        <Card className="w-full shadow-none border-0">
            <CardHeader className="border-b py-4">
                <CardTitle className="text-lg font-semibold">Sample Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="pt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            title={stat.title}
                            icon={stat.icon}
                            value={stat.value}
                            data={stat.data}
                            color={stat.color}
                            isLoading={isLoading}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default StaticsOne;