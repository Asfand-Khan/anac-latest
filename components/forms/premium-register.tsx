"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

const branches = [
    { value: "branch1", label: "Branch 1" },
    { value: "branch2", label: "Branch 2" },
    { value: "branch3", label: "Branch 3" },
];

const products = [
    { value: "product1", label: "Product 1" },
    { value: "product2", label: "Product 2" },
    { value: "product3", label: "Product 3" },
];

const clients = [
    { value: "client1", label: "Client 1" },
    { value: "client2", label: "Client 2" },
    { value: "client3", label: "Client 3" },
];

const agencies = [
    { value: "agency1", label: "Agency 1" },
    { value: "agency2", label: "Agency 2" },
    { value: "agency3", label: "Agency 3" },
];

const usernames = [
    { value: "user1", label: "User 1" },
    { value: "user2", label: "User 2" },
    { value: "user3", label: "User 3" },
];

const transactionTypes = [
    { value: "type1", label: "Transaction Type 1" },
    { value: "type2", label: "Transaction Type 2" },
    { value: "type3", label: "Transaction Type 3" },
];

const orderStatuses = [
    { value: "status1", label: "Order Status 1" },
    { value: "status2", label: "Order Status 2" },
    { value: "status3", label: "Order Status 3" },
];

// ComboBox component
const ComboBox = ({ items, placeholder }: { items: { value: string; label: string }[]; placeholder: string }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="lg"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between px-3 capitalize hover:bg-transparent"
                >
                    {value ? items.find((item) => item.value === value)?.label : placeholder}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                <Command>
                    <CommandInput placeholder="Search..." className="h-11" />
                    <CommandList>
                        <CommandEmpty>No items found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    onSelect={() => {
                                        setValue(item.value === value ? "" : item.value);
                                        setOpen(false);
                                    }}
                                >
                                    {item.label}
                                    <Check className={cn("ml-auto", value === item.value ? "opacity-100" : "opacity-0")} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

const PremiumRegister = () => {
    const [date, setDate] = useState<Date>();

    return (
        <div className="pt-6 lg:w-1/2 w-full">
            <form className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-base font-medium">Select Date</h1>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2 flex flex-col">
                            <Label>From</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className={cn(
                                            "w-full justify-start text-left font-normal px-3 hover:bg-transparent",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                        className="w-full"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2 flex flex-col">
                            <Label>To</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className={cn(
                                            "w-full justify-start text-left font-normal px-3 hover:bg-transparent",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
                {
                    [
                        { title: "Branch", items: branches },
                        { title: "Product", items: products },
                        { title: "Client", items: clients },
                        { title: "DO/Agency", items: agencies },
                        { title: "Username", items: usernames },
                        { title: "Transaction Type", items: transactionTypes },
                        { title: "Order Status", items: orderStatuses },
                    ].map(({ items, title }) => (
                        <div className="space-y-2" key={title}>
                            <h1 className="text-base font-medium">Select {title}</h1>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label>From</Label>
                                    <ComboBox items={items} placeholder={`Select ${title.toLowerCase()}`} />
                                </div>
                                <div className="space-y-2">
                                    <Label>To</Label>
                                    <ComboBox items={items} placeholder={`Select ${title.toLowerCase()}`} />
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className="flex md:flex-row flex-col gap-4">
                    <Button
                        variant="primary"
                        size="lg"
                        className="md:w-max w-full"
                        type="submit"
                    >
                        Execute Excel
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="md:w-max w-full"
                        type="button"
                    >
                        Execute Pdf
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PremiumRegister;