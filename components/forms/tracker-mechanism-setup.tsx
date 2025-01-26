"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const trackers = [
    { value: "megatech", label: "megatech" },
    { value: "falcon-I", label: "falcon-I" },
    { value: "strartech", label: "strartech" },
];

const makes = [
    { value: "toyota", label: "toyota" },
    { value: "honda", label: "honda" },
    { value: "nissan", label: "nissan" },
    { value: "ford", label: "ford" },
    { value: "chevrolet", label: "chevrolet" },
    { value: "bmw", label: "bmw" },
    { value: "mercedes", label: "mercedes" },
    { value: "audi", label: "audi" },
    { value: "volkswagen", label: "volkswagen" },
    { value: "mazda", label: "mazda" },
    { value: "subaru", label: "subaru" },
    { value: "kia", label: "kia" },
    { value: "hyundai", label: "hyundai" },
    { value: "peugeot", label: "peugeot" },
    { value: "renault", label: "renault" },
    { value: "fiat", label: "fiat" },
    { value: "land_rover", label: "land rover" },
    { value: "jaguar", label: "jaguar" },
    { value: "porsche", label: "porsche" },
    { value: "tesla", label: "tesla" },
];

const regions = [
    { value: "karachi", label: "karachi" },
    { value: "lahore", label: "lahore" },
    { value: "islamabad", label: "islamabad" },
    { value: "quetta", label: "quetta" },
    { value: "peshawar", label: "peshawar" },
    { value: "punjab", label: "punjab" },
];

const options = [
    "kia classic",
    "kia classic NGV LX",
    "kia grand sportage",
    "kia sportage EX",
    "kia sportage LX",
    "kia sportage SX",
    "kia sorrento LX",
    "kia sorrento EX",
    "kia sorrento SX",
    "kia picanto",
    "kia cerato",
    "kia rio",
    "kia stinger GT",
    "kia stinger GT-Line",
    "kia carnival",
    "kia soul",
    "kia optima",
    "kia niro",
    "kia niro hybrid",
    "kia sportage GT-Line",
    "kia Seltos LX",
    "kia Seltos EX",
    "kia Seltos SX",
    "kia forte",
    "kia forte GT",
    "kia forte LX",
    "kia forte EX",
    "kia cadenza",
    "kia k900",
    "kia xceed",
    "kia ev6",
    "kia soul EV",
    "kia Niro EV",
    "kia stinger GT2",
    "kia stinger GT3",
    "kia sportage hybrid",
    "kia sportage plug-in hybrid",
];


const TrackerMechanismSetup = () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [trackerOpen, setTrackerOpen] = useState(false);
    const [trackerValue, setTrackerValue] = useState("");
    const [makeOpen, setMakeOpen] = useState(false);
    const [makeValues, setMakeValues] = useState<string[]>([]);
    const [regionOpen, setRegionOpen] = useState(false);
    const [regionValue, setRegionValue] = useState("");

    // Toggle individual make option
    const toggleMake = (value: string) => {
        setMakeValues((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    const isAllSelected = selectedOptions.length === options.length;

    const toggleSelectAll = () => {
        setSelectedOptions(isAllSelected ? [] : options);
    };

    const handleOptionChange = (option: string) => {
        setSelectedOptions((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    return (
        <div className="pt-6 w-full flex lg:flex-row flex-col gap-6">
            {/* Form Section */}
            <form className="grid lg:grid-cols-2 grid-cols-1 gap-6 w-full">
                <div className="space-y-6 w-full">
                    {/* Tracker Field */}
                    <div className="space-y-2">
                        <Label className="text-charcoal">Select Tracker</Label>
                        <Popover open={trackerOpen} onOpenChange={setTrackerOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    role="combobox"
                                    aria-expanded={trackerOpen}
                                    className="w-full justify-between px-3 capitalize hover:bg-transparent"
                                >
                                    {trackerValue
                                        ? trackers.find(
                                            (tracker) => tracker.value === trackerValue
                                        )?.label
                                        : "Select Tracker"}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                                <Command>
                                    <CommandInput placeholder="Search Tracker" className="h-11" />
                                    <CommandList>
                                        <CommandEmpty>No tracker found.</CommandEmpty>
                                        <CommandGroup>
                                            {trackers.map((tracker) => (
                                                <CommandItem
                                                    key={tracker.value}
                                                    value={tracker.value}
                                                    className="capitalize"
                                                    onSelect={() => {
                                                        setTrackerValue(tracker.value);
                                                        setTrackerOpen(false);
                                                    }}
                                                >
                                                    {tracker.label}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            trackerValue === tracker.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Region Field */}
                    <div className="space-y-2">
                        <Label className="text-charcoal">Select Region</Label>
                        <Popover open={regionOpen} onOpenChange={setRegionOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    role="combobox"
                                    aria-expanded={regionOpen}
                                    className="w-full justify-between px-3 capitalize hover:bg-transparent"
                                >
                                    {regionValue
                                        ? regions.find((region) => region.value === regionValue)?.label
                                        : "Select Region"}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                                <Command>
                                    <CommandInput placeholder="Search Region" className="h-11" />
                                    <CommandList>
                                        <CommandEmpty>No region found.</CommandEmpty>
                                        <CommandGroup>
                                            {regions.map((region) => (
                                                <CommandItem
                                                    key={region.value}
                                                    value={region.value}
                                                    className="capitalize"
                                                    onSelect={() => {
                                                        setRegionValue(region.value);
                                                        setRegionOpen(false);
                                                    }}
                                                >
                                                    {region.label}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            regionValue === region.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Make Field (Multi-select) */}
                    <div className="space-y-2">
                        <Label className="text-charcoal">Select Make</Label>
                        <Popover open={makeOpen} onOpenChange={setMakeOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    role="combobox"
                                    aria-expanded={makeOpen}
                                    className="w-full justify-between px-3 capitalize hover:bg-transparent whitespace-break-spaces text-start min-h-11 h-full"
                                >
                                    {makeValues.length > 0
                                        ? makeValues
                                            .map(
                                                (value) =>
                                                    makes.find((make) => make.value === value)
                                                        ?.label
                                            )
                                            .join(", ")
                                        : "Select Make"}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                                <Command>
                                    <CommandInput placeholder="Search Make" className="h-11" />
                                    <CommandList>
                                        <CommandEmpty>No make found.</CommandEmpty>
                                        <CommandGroup>
                                            {makes.map((make) => (
                                                <CommandItem
                                                    key={make.value}
                                                    value={make.value}
                                                    className="capitalize"
                                                    onSelect={() => toggleMake(make.value)}
                                                >
                                                    {make.label}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            makeValues.includes(make.value)
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {/* Options Section */}
                <div className="w-full space-y-2 bg-gray-100 rounded-lg p-4">
                    <Label className="text-charcoal">Choose Sub Make</Label>
                    <ScrollArea className="h-[205px]">
                        <ScrollBar orientation="vertical" />
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-xl font-semibold">KIA</h1>
                                <div className="space-y-2 overflow-y-auto">
                                    {/* Select All */}
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="select-all"
                                            checked={isAllSelected}
                                            onCheckedChange={toggleSelectAll}
                                        />
                                        <Label htmlFor="select-all" className="text-sm">
                                            Select All
                                        </Label>
                                    </div>

                                    {/* Individual Options */}
                                    {options.map((option) => (
                                        <div key={option} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={option}
                                                checked={selectedOptions.includes(option)}
                                                onCheckedChange={() => handleOptionChange(option)}
                                            />
                                            <Label htmlFor={option} className="text-sm">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-xl font-semibold">KIA</h1>
                                <div className="space-y-2 overflow-y-auto">
                                    {/* Select All */}
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="select-all"
                                            checked={isAllSelected}
                                            onCheckedChange={toggleSelectAll}
                                        />
                                        <Label htmlFor="select-all" className="text-sm">
                                            Select All
                                        </Label>
                                    </div>

                                    {/* Individual Options */}
                                    {options.map((option) => (
                                        <div key={option} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={option}
                                                checked={selectedOptions.includes(option)}
                                                onCheckedChange={() => handleOptionChange(option)}
                                            />
                                            <Label htmlFor={option} className="text-sm">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-xl font-semibold">KIA</h1>
                                <div className="space-y-2 overflow-y-auto">
                                    {/* Select All */}
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="select-all"
                                            checked={isAllSelected}
                                            onCheckedChange={toggleSelectAll}
                                        />
                                        <Label htmlFor="select-all" className="text-sm">
                                            Select All
                                        </Label>
                                    </div>

                                    {/* Individual Options */}
                                    {options.map((option) => (
                                        <div key={option} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={option}
                                                checked={selectedOptions.includes(option)}
                                                onCheckedChange={() => handleOptionChange(option)}
                                            />
                                            <Label htmlFor={option} className="text-sm">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-xl font-semibold">KIA</h1>
                                <div className="space-y-2 overflow-y-auto">
                                    {/* Select All */}
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="select-all"
                                            checked={isAllSelected}
                                            onCheckedChange={toggleSelectAll}
                                        />
                                        <Label htmlFor="select-all" className="text-sm">
                                            Select All
                                        </Label>
                                    </div>

                                    {/* Individual Options */}
                                    {options.map((option) => (
                                        <div key={option} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={option}
                                                checked={selectedOptions.includes(option)}
                                                onCheckedChange={() => handleOptionChange(option)}
                                            />
                                            <Label htmlFor={option} className="text-sm">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="flex md:flex-row flex-col gap-4">
                    <Button variant="primary" size="lg" className="md:w-max w-full" type="submit">
                        Submit
                    </Button>
                    <Button variant="secondary" size="lg" className="md:w-max w-full" type="button">
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default TrackerMechanismSetup;
