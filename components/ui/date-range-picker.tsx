// "use client"

// import * as React from "react"
// import { addDays, format } from "date-fns"
// import { CalendarIcon } from 'lucide-react'
// import { DateRange } from "react-day-picker"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"

// export function DateRangePicker({
//     className,
// }: React.HTMLAttributes<HTMLDivElement>) {
//     const [date, setDate] = React.useState<DateRange | undefined>({
//         from: new Date(),
//         to: addDays(new Date(), 7),
//     })
//     const [isOpen, setIsOpen] = React.useState(false)

//     const [tempDate, setTempDate] = React.useState<DateRange | undefined>(date)

//     const handleApply = () => {
//         setDate(tempDate)
//         setIsOpen(false)
//     }

//     const handleCancel = () => {
//         setTempDate(date)
//         setIsOpen(false)
//     }

//     return (
//         <div className={cn("grid gap-2", className)}>
//             <Popover open={isOpen} onOpenChange={setIsOpen}>
//                 <PopoverTrigger asChild>
//                     <Button
//                         id="date"
//                         variant={"secondary"}
//                         size={"lg"}
//                         className={cn(
//                             "w-auto justify-center text-left font-normal",
//                             !date && "text-muted-foreground"
//                         )}
//                     >
//                         <CalendarIcon className="mr-1 h-4 w-4" />
//                         {date?.from ? (
//                             date.to ? (
//                                 <>
//                                     {format(date.from, "LLL dd, y")} -{" "}
//                                     {format(date.to, "LLL dd, y")}
//                                 </>
//                             ) : (
//                                 format(date.from, "LLL dd, y")
//                             )
//                         ) : (
//                             <span>Pick a date</span>
//                         )}
//                     </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="end">
//                     <Calendar
//                         initialFocus
//                         mode="range"
//                         defaultMonth={tempDate?.from}
//                         selected={tempDate}
//                         onSelect={setTempDate}
//                         numberOfMonths={2}
//                     />
//                     <div className="flex justify-end gap-2 p-3">
//                         <Button variant="secondary" onClick={handleCancel}>
//                             Cancel
//                         </Button>
//                         <Button variant={"primary"} onClick={handleApply}>Apply</Button>
//                     </div>
//                 </PopoverContent>
//             </Popover>
//         </div>
//     )
// }

"use client"

import * as React from "react"
import { addDays, format, startOfToday, addMonths } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DateRangePicker({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 7),
    })
    const [isOpen, setIsOpen] = React.useState(false)

    const [tempDate, setTempDate] = React.useState<DateRange | undefined>(date)

    const handleApply = () => {
        setDate(tempDate)
        setIsOpen(false)
    }

    const handleCancel = () => {
        setTempDate(date)
        setIsOpen(false)
    }

    // Predefined date ranges
    const handleQuickSelect = (range: "today" | "1week" | "1month" | "2months" | "3months") => {
        let from: Date, to: Date;

        switch (range) {
            case "today":
                from = startOfToday();
                to = startOfToday();
                break;
            case "1week":
                from = new Date();
                to = addDays(new Date(), 7);
                break;
            case "1month":
                from = new Date();
                to = addMonths(new Date(), 1);
                break;
            case "2months":
                from = new Date();
                to = addMonths(new Date(), 2);
                break;
            case "3months":
                from = new Date();
                to = addMonths(new Date(), 3);
                break;
            default:
                return;
        }

        setTempDate({ from, to });
    }

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"secondary"}
                        size={"lg"}
                        className={cn(
                            "w-auto justify-center text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <div className="flex justify-between gap-2 p-3">
                        <Button variant="outline" onClick={() => handleQuickSelect("today")}>
                            Today
                        </Button>
                        <Button variant="outline" onClick={() => handleQuickSelect("1week")}>
                            1 Week
                        </Button>
                        <Button variant="outline" onClick={() => handleQuickSelect("1month")}>
                            1 Month
                        </Button>
                        <Button variant="outline" onClick={() => handleQuickSelect("2months")}>
                            2 Months
                        </Button>
                        <Button variant="outline" onClick={() => handleQuickSelect("3months")}>
                            3 Months
                        </Button>
                    </div>
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={tempDate?.from}
                        selected={tempDate}
                        onSelect={setTempDate}
                        numberOfMonths={2}
                    />
                    <div className="flex justify-end gap-2 p-3">
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant={"primary"} onClick={handleApply}>Apply</Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
