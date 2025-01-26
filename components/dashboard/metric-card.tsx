import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { MetricDataTypes } from "@/types/types"

const MetricCard = ({ label, value, change, icon }: MetricDataTypes) => {

    const isPositive = change >= 0

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{label}</p>
                        <h3 className="text-2xl font-bold">{value}</h3>
                        <p className={cn(
                            "text-sm font-medium",
                            isPositive ? "text-green-600" : "text-red-600"
                        )}>
                            {isPositive ? "+" : ""}{change}%
                        </p>
                    </div>
                    <div className={cn(
                        "p-2 rounded-md",
                        label === "Followers" && "bg-blue-50",
                        label === "Amount Spent" && "bg-green-50",
                        label === "Reach" && "bg-purple-50"
                    )}>
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default MetricCard