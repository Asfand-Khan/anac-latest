"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  ChevronsUpDown,
  Check,
  CalendarIcon,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Calendar } from "../ui/calendar";

const products = [
  "FEROZE 1881 MILLS-H-21 UNIT(WIDD)",
  "FEROZE 1882 MILLS-H-22 UNIT(OTHERS)",
  "FEROZE 1883 MILLS-H-23 UNIT(WIDD)",
];

const machineKinds = ["Industrial Machine", "Commercial Machine"];
const machineMakes = ["CATERPILLAR"];
const machineTypes = ["3516", "3517", "3518", "3519"];
const analysisTypes = ["Gas", "Fuel", "Diesel"];
const partKinds = ["Engine on natural gas"];
const partMakes = ["Caterpillar"];
const partTypes = ["Demo 01", "Demo 02"];
const mileageUnits = ["Hours", "Minutes", "Days", "Months", "Years"];
const topUpUnits = ["L"];
const oilNames = ["Total Nateria MWX 40", "Total Nateria MWX 50"];

// const paymentOptions = [
//   {
//     id: "credit-card",
//     icon: <CreditCard className="w-6 h-6 text-blue-500" />,
//     title: "Credit Card",
//     description: "You will be redirected to Credit/Debit Card Payment Page.",
//   },
//   {
//     id: "cash-on-delivery",
//     icon: <DollarSign className="w-6 h-6 text-green-500" />,
//     title: "Cash On Delivery",
//     description:
//       "Additional cash to be paid by the client to Courier Partner separately for Cash on Delivery orders.",
//   },
//   {
//     id: "cheque-on-order",
//     icon: <FileText className="w-6 h-6 text-gray-500" />,
//     title: "Cheque On Order",
//     description: "",
//   },
//   {
//     id: "cheque-on-delivery",
//     icon: <File className="w-6 h-6 text-yellow-500" />,
//     title: "Cheque On Delivery",
//     description:
//       "Additional cash to be paid by the client to Courier Partner separately for Cheque on Delivery orders.",
//   },
// ];

const CreatePolicy = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    product: "",
    machineKind: "",
    machineMake: "",
    machineType: "",
    machineInfo1: "",
    machineInfo2: "",
    machineId: "",
    analysisType: "",
    partKind: "",
    partMake: "",
    partType: "",
    partInfo: "",
    partId: "",
    barcodeNo: "",
    sampleDate: "" as unknown as Date,
    capacity: "",
    totalMileage: 0,
    mileageUnit: "Hours",
    oilTime: undefined as number | undefined,
    topUp: undefined as number | undefined,
    topUpUnit: "",
    oilName: "",
    oilMake: "",
    oilType: "",
    oilGrade: undefined as number | undefined
  });
  const [open, setOpen] = React.useState(false);
  const [machineKindOpen, setMachineKindOpen] = React.useState(false);
  const [machineMakeOpen, setMachineMakeOpen] = React.useState(false);
  const [machineTypeOpen, setMachineTypeOpen] = React.useState(false);
  const [analysisTypeOpen, setAnalysisTypeOpen] = React.useState(false);
  const [partKindOpen, setPartKindOpen] = React.useState(false);
  const [partMakeOpen, setPartMakeOpen] = React.useState(false);
  const [partTypeOpen, setPartTypeOpen] = React.useState(false);
  const [mileageUnitOpen, setMileageUnitOpen] = React.useState(false);
  const [topUpUnitOpen, setTopUpUnitOpen] = React.useState(false);
  const [oilNameOpen, setOilNameOpen] = React.useState(false);

  const steps = [
    { number: 1, description: "Machine Creation", title: "Machine" },
    { number: 2, description: "Part Creation", title: "Part" },
    { number: 3, description: "Sample Creation", title: "Sample" },
    { number: 4, description: "Confirmation", title: "Confirmation" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className="pt-6 gap-6 mx-auto lg:w-8/12 w-full">
        <div className="w-full space-y-6">
          {/* Stepper */}
          <div className="flex items-center relative">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold",
                      currentStep >= step.number
                        ? "bg-primary-100 text-white"
                        : "bg-gray-200 text-gray-500"
                    )}
                  >
                    {step.number}
                  </div>
                  <span
                    className={cn(
                      currentStep >= step.number
                        ? "text-primary-100"
                        : "text-gray-500"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-full h-1",
                      currentStep > step.number
                        ? "bg-primary-100"
                        : "bg-gray-200"
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {currentStep === 1 && (
            <div className="space-y-4">
              <h1 className="text-lg text-primary-100 font-semibold underline">
                {steps[0]?.description}
              </h1>

              <div className="space-y-6">
                <div className="space-y-2">
                  {/* <h1 className="text-base font-medium">Product Information</h1> */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="product">
                        Customer <span className="text-red-500">*</span>
                      </Label>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="lg"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between px-3 capitalize hover:bg-transparent"
                          >
                            {formData.product || "Select customer..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                          <Command>
                            <CommandInput
                              placeholder="Search customers..."
                              className="h-11"
                            />
                            <CommandEmpty>No customers found.</CommandEmpty>
                            <CommandGroup>
                              {products.map((product) => (
                                <CommandItem
                                  key={product}
                                  onSelect={() => {
                                    setFormData({ ...formData, product });
                                    setOpen(false);
                                  }}
                                >
                                  {product}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      formData.product === product
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product">
                        Machine Kind <span className="text-red-500">*</span>
                      </Label>
                      <Popover
                        open={machineKindOpen}
                        onOpenChange={setMachineKindOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="lg"
                            role="combobox"
                            aria-expanded={machineKindOpen}
                            className="w-full justify-between px-3 capitalize hover:bg-transparent"
                          >
                            {formData.machineKind || "Select machine kind..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                          <Command>
                            <CommandInput
                              placeholder="Search machine kind..."
                              className="h-11"
                            />
                            <CommandEmpty>No machine kind found.</CommandEmpty>
                            <CommandGroup>
                              {machineKinds.map((kind) => (
                                <CommandItem
                                  key={kind}
                                  onSelect={() => {
                                    setFormData({
                                      ...formData,
                                      machineKind: kind,
                                    });
                                    setOpen(false);
                                  }}
                                >
                                  {kind}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      formData.machineKind === kind
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="flex gap-2 lg:flex-row flex-col">
                      <div className="w-full lg:w-1/2 space-y-2">
                        <Label htmlFor="machinemake">
                          Machine Make <span className="text-red-500">*</span>
                        </Label>
                        <Popover
                          open={machineMakeOpen}
                          onOpenChange={setMachineMakeOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="lg"
                              role="combobox"
                              aria-expanded={machineMakeOpen}
                              className="w-full justify-between px-3 capitalize hover:bg-transparent"
                            >
                              {formData.machineMake || "Select machine make..."}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                            <Command>
                              <CommandInput
                                placeholder="Search machine make..."
                                className="h-11"
                              />
                              <CommandEmpty>
                                No machine make found.
                              </CommandEmpty>
                              <CommandGroup>
                                {machineMakes.map((make) => (
                                  <CommandItem
                                    key={make}
                                    onSelect={() => {
                                      setFormData({
                                        ...formData,
                                        machineMake: make,
                                      });
                                      setMachineMakeOpen(false);
                                    }}
                                  >
                                    {make}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        formData.machineMake === make
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="w-full lg:w-1/2 space-y-2">
                        <Label htmlFor="machinemake">Other Machine Make</Label>
                        <Input
                          id="machinemake"
                          type="text"
                          placeholder="Other Machine Make"
                          value={formData.machineMake}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              machineMake: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 lg:flex-row flex-col">
                      <div className="w-full lg:w-1/2 space-y-2">
                        <Label htmlFor="machinetype">
                          Machine Type <span className="text-red-500">*</span>
                        </Label>
                        <Popover
                          open={machineTypeOpen}
                          onOpenChange={setMachineTypeOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="lg"
                              role="combobox"
                              aria-expanded={machineTypeOpen}
                              className="w-full justify-between px-3 capitalize hover:bg-transparent"
                            >
                              {formData.machineType || "Select machine type..."}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                            <Command>
                              <CommandInput
                                placeholder="Search machine type..."
                                className="h-11"
                              />
                              <CommandEmpty>
                                No machine type found.
                              </CommandEmpty>
                              <CommandGroup>
                                {machineTypes.map((type) => (
                                  <CommandItem
                                    key={type}
                                    onSelect={() => {
                                      setFormData({
                                        ...formData,
                                        machineType: type,
                                      });
                                      setMachineTypeOpen(false);
                                    }}
                                  >
                                    {type}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        formData.machineType === type
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="w-full lg:w-1/2 space-y-2">
                        <Label htmlFor="machinetype">Other Machine Type</Label>
                        <Input
                          id="machinetype"
                          type="text"
                          placeholder="Other Machine Type"
                          value={formData.machineType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              machineType: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 lg:flex-row flex-col">
                      <div className="w-full lg:w-1/3 space-y-2">
                        <Label htmlFor="machineinfo1">Machine Info 01</Label>
                        <Input
                          id="machineinfo1"
                          type="text"
                          placeholder="Machine Info 01"
                          value={formData.machineInfo1}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              machineInfo1: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="w-full lg:w-1/3 space-y-2">
                        <Label htmlFor="machineinfo2">Machine Info 02</Label>
                        <Input
                          id="machineinfo2"
                          type="text"
                          placeholder="Machine Info 02"
                          value={formData.machineInfo2}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              machineInfo2: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="w-full lg:w-1/3 space-y-2">
                        <Label htmlFor="machineid">Machine ID</Label>
                        <Input
                          id="machineid"
                          type="text"
                          placeholder="Machine ID"
                          value={formData.machineId}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              machineId: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* <div className="space-y-2">
                      <Label htmlFor="insuranceValue">
                        Insurance Estimated Value{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="insuranceValue"
                        type="number"
                        placeholder="Insurance Estimated Value"
                        value={formData.insuranceValue}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            insuranceValue: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h1 className="text-lg text-primary-100 font-semibold underline">
                {steps[1]?.description}
              </h1>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="Analysistype">
                        Analysis Type <span className="text-red-500">*</span>
                      </Label>
                      <Popover
                        open={analysisTypeOpen}
                        onOpenChange={setAnalysisTypeOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="lg"
                            role="combobox"
                            aria-expanded={analysisTypeOpen}
                            className="w-full justify-between px-3 capitalize hover:bg-transparent"
                          >
                            {formData.analysisType || "Select analysis type..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                          <Command>
                            <CommandInput
                              placeholder="Search analysis type..."
                              className="h-11"
                            />
                            <CommandEmpty>
                              No analysis types found.
                            </CommandEmpty>
                            <CommandGroup>
                              {analysisTypes.map((analysisType) => (
                                <CommandItem
                                  key={analysisType}
                                  onSelect={() => {
                                    setFormData({ ...formData, analysisType });
                                    setAnalysisTypeOpen(false);
                                  }}
                                >
                                  {analysisType}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      formData.analysisType === analysisType
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicleMake">
                        Part Kind <span className="text-red-500">*</span>
                      </Label>
                      <Popover
                        open={partKindOpen}
                        onOpenChange={setPartKindOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="lg"
                            role="combobox"
                            className="w-full justify-between px-3 capitalize hover:bg-transparent"
                          >
                            {formData.partKind || "Select part kind..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                          <Command>
                            <CommandInput
                              placeholder="Search part kinds..."
                              className="h-11"
                            />
                            <CommandEmpty>No part kinds found.</CommandEmpty>
                            <CommandGroup>
                              {partKinds.map((partKind) => (
                                <CommandItem
                                  key={partKind}
                                  onSelect={() => {
                                    setFormData({
                                      ...formData,
                                      partKind,
                                    });
                                    setPartKindOpen(false); // Close popover on select
                                  }}
                                >
                                  {partKind}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      formData.partKind === partKind
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="flex gap-2 lg:flex-row flex-col">
                      <div className="w-full lg:w-1/2 space-y-2">
                        <Label htmlFor="partmake">
                          Part Make <span className="text-red-500">*</span>
                        </Label>
                        <Popover
                          open={partMakeOpen}
                          onOpenChange={setPartMakeOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="lg"
                              role="combobox"
                              aria-expanded={partMakeOpen}
                              className="w-full justify-between px-3 capitalize hover:bg-transparent"
                            >
                              {formData.partMake || "Select part make..."}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                            <Command>
                              <CommandInput
                                placeholder="Search part make..."
                                className="h-11"
                              />
                              <CommandEmpty>No part make found.</CommandEmpty>
                              <CommandGroup>
                                {partMakes.map((make) => (
                                  <CommandItem
                                    key={make}
                                    onSelect={() => {
                                      setFormData({
                                        ...formData,
                                        partMake: make,
                                      });
                                      setPartMakeOpen(false);
                                    }}
                                  >
                                    {make}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        formData.partMake === make
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="w-full lg:w-1/2 space-y-2">
                        <Label htmlFor="partmake">Other Part Make</Label>
                        <Input
                          id="partmake"
                          type="text"
                          placeholder="Other Part Make"
                          value={formData.partMake}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              partMake: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 lg:flex-row flex-col">
                      <div className="w-full lg:w-1/2 space-y-2">
                        <Label htmlFor="parttype">
                          Part Type <span className="text-red-500">*</span>
                        </Label>
                        <Popover
                          open={partTypeOpen}
                          onOpenChange={setPartTypeOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="lg"
                              role="combobox"
                              aria-expanded={partTypeOpen}
                              className="w-full justify-between px-3 capitalize hover:bg-transparent"
                            >
                              {formData.partType || "Select part type..."}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                            <Command>
                              <CommandInput
                                placeholder="Search part type..."
                                className="h-11"
                              />
                              <CommandEmpty>No part type found.</CommandEmpty>
                              <CommandGroup>
                                {partTypes.map((type) => (
                                  <CommandItem
                                    key={type}
                                    onSelect={() => {
                                      setFormData({
                                        ...formData,
                                        partType: type,
                                      });
                                      setPartTypeOpen(false);
                                    }}
                                  >
                                    {type}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        formData.partType === type
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="w-full lg:w-1/2 space-y-2">
                        <Label htmlFor="otherparttype">Other Part Type</Label>
                        <Input
                          id="otherparttype"
                          type="text"
                          placeholder="Other Machine Make"
                          value={formData.partType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              partType: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 lg:flex-row flex-col">
                      <div className="w-full lg:w-1/2 space-y-2">
                        <Label htmlFor="partinfo">
                          Part Info <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="partinfo"
                          type="text"
                          placeholder="Other Part Info"
                          value={formData.partInfo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              partInfo: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="w-full lg:w-1/2 space-y-2">
                        <Label htmlFor="partid">Part ID</Label>
                        <Input
                          id="partid"
                          type="text"
                          placeholder="Part ID"
                          value={formData.partId}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              partId: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="capacity">
                        Capacity(in litres){" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="capacity"
                        type="text"
                        placeholder="Capacity(in litres)"
                        value={formData.capacity}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            capacity: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-charcoal" htmlFor="bicarburation">
                        Bi-carburation
                      </Label>
                      <RadioGroup defaultValue="no" id="bicarburation">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="active" />
                          <Label className="text-charcoal" htmlFor="active">
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="inactive" />
                          <Label className="text-charcoal" htmlFor="inactive">
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h1 className="text-lg text-primary-100 font-semibold underline">
                {steps[2]?.description}
              </h1>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-base font-medium mb-3">
                    Sample Information
                  </h1>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="barcodeNo">
                        Barcode No <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="barcodeNo"
                        type="text"
                        placeholder="Barcode No"
                        value={formData.barcodeNo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            barcodeNo: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sampleDate">
                        Sample Date <span className="text-red-500">*</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="lg"
                            className={cn(
                              "w-full justify-start text-left font-normal px-3 hover:bg-transparent",
                              !formData.sampleDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon />
                            {formData.sampleDate ? (
                              format(formData.sampleDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.sampleDate as Date}
                            onSelect={(date) =>
                              setFormData({
                                ...formData,
                                sampleDate: date as Date,
                              })
                            }
                            className="w-full"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-charcoal" htmlFor="intermediate">
                        Intermediate Sample
                      </Label>
                      <RadioGroup defaultValue="no" id="intermediate">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="active" />
                          <Label className="text-charcoal" htmlFor="active">
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="inactive" />
                          <Label className="text-charcoal" htmlFor="inactive">
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                        <h1 className="text-base font-medium mb-3">
                          Machine Information
                        </h1>
                      <div className="flex gap-2 lg:flex-row flex-col">
                      <div className="w-full lg:w-1/2 space-y-2">
                          <Label htmlFor="totalmileage">
                            Total Mileage
                          </Label>
                          <Input
                            id="totalmileage"
                            type="number"
                            placeholder="Total Mileage"
                            value={formData.totalMileage}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                totalMileage: +e.target.value,
                              })
                            }
                            className="w-full"
                          />
                        </div>
                        <div className="w-full lg:w-1/2 space-y-2">
                          <Label htmlFor="units">
                            Units <span className="text-red-500">*</span>
                          </Label>
                          <Popover
                            open={mileageUnitOpen}
                            onOpenChange={setMileageUnitOpen}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                size="lg"
                                role="combobox"
                                aria-expanded={mileageUnitOpen}
                                className="w-full justify-between px-3 capitalize hover:bg-transparent"
                              >
                                {formData.mileageUnit ||
                                  "Select mileage unit..."}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                              <Command>
                                <CommandInput
                                  placeholder="Search mileage unit..."
                                  className="h-11"
                                />
                                <CommandEmpty>
                                  No mileage unit found.
                                </CommandEmpty>
                                <CommandGroup>
                                  {mileageUnits.map((units) => (
                                    <CommandItem
                                      key={units}
                                      onSelect={() => {
                                        setFormData({
                                          ...formData,
                                          mileageUnit: units,
                                        });
                                        setMileageUnitOpen(false);
                                      }}
                                    >
                                      {units}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          formData.mileageUnit === units
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="oilTime">
                        Oil/Fluid Time <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="oilTime"
                        type="number"
                        placeholder="Oil / fluid time"
                        value={formData.oilTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            oilTime: +e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="flex gap-2 lg:flex-row flex-col">
                    <div className="w-full lg:w-1/2 space-y-2">
                        <Label htmlFor="topup">
                          Top up <span className="text-red-500">*</span>
                          </Label>
                        <Input
                          id="topup"
                          type="number"
                          placeholder="Top up"
                          value={formData.topUp}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              topUp: +e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="w-full lg:w-1/2 space-y-2">
                        <Label htmlFor="topUpUnits">
                          Unit <span className="text-red-500">*</span>
                        </Label>
                        <Popover
                          open={topUpUnitOpen}
                          onOpenChange={setTopUpUnitOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="lg"
                              role="combobox"
                              aria-expanded={topUpUnitOpen}
                              className="w-full justify-between px-3 capitalize hover:bg-transparent"
                            >
                              {formData.topUpUnit || "Select top up unit..."}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                            <Command>
                              <CommandInput
                                placeholder="Search top up..."
                                className="h-11"
                              />
                              <CommandEmpty>
                                No top up found.
                              </CommandEmpty>
                              <CommandGroup>
                                {topUpUnits.map((topup) => (
                                  <CommandItem
                                    key={topup}
                                    onSelect={() => {
                                      setFormData({
                                        ...formData,
                                        topUpUnit: topup,
                                      });
                                      setTopUpUnitOpen(false);
                                    }}
                                  >
                                    {topup}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        formData.topUpUnit === topup
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="oilName">
                        Oil/Fluid Time <span className="text-red-500">*</span>
                      </Label>
                      <Popover
                          open={oilNameOpen}
                          onOpenChange={setOilNameOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="lg"
                              role="combobox"
                              aria-expanded={oilNameOpen}
                              className="w-full justify-between px-3 capitalize hover:bg-transparent"
                            >
                              {formData.oilName || "Select oil name..."}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                            <Command>
                              <CommandInput
                                placeholder="Search oil name..."
                                className="h-11"
                              />
                              <CommandEmpty>
                                No oil name found.
                              </CommandEmpty>
                              <CommandGroup>
                                {oilNames.map((oilname) => (
                                  <CommandItem
                                    key={oilname}
                                    onSelect={() => {
                                      setFormData({
                                        ...formData,
                                        oilName: oilname,
                                      });
                                      setOilNameOpen(false);
                                    }}
                                  >
                                    {oilname}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        formData.oilName === oilname
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex gap-2 lg:flex-row flex-col">
                      <div className="w-full lg:w-1/3 space-y-2">
                        <Label htmlFor="oil/fluidmake">Oil/Fluid Make</Label>
                        <Input
                          id="oil/fluidmake"
                          type="text"
                          placeholder="Oil / fluid make"
                          value={formData.oilMake}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              oilMake: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="w-full lg:w-1/3 space-y-2">
                        <Label htmlFor="oil/fluidtype">Oil/Fluid Type</Label>
                        <Input
                          id="oil/fluidtype"
                          type="text"
                          placeholder="Oil / fluid type"
                          value={formData.oilType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              oilType: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="w-full lg:w-1/3 space-y-2">
                        <Label htmlFor="oil/fluidgrade">Oil/Fluid Grade</Label>
                        <Input
                          id="oil/fluidgrade"
                          type="number"
                          placeholder="Oil / fluid grade"
                          value={formData.oilGrade}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              oilGrade: +e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* <div className="space-y-2">
                      <Label htmlFor="insuranceValue">
                        Insurance Estimated Value{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="insuranceValue"
                        type="number"
                        placeholder="Insurance Estimated Value"
                        value={formData.insuranceValue}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            insuranceValue: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h1 className="text-lg text-primary-100 font-semibold underline">
                {steps[3]?.title}
              </h1>

              <div className="space-y-2">
                <h1 className="text-base font-medium">Here will be all the inserted data for review</h1>
                <div className="space-y-6">
                  {/* {paymentOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-2xl">
                        {option.icon}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-base font-medium text-gray-950 flex items-center">
                          {option.title}
                          <Check className="ml-2 w-5 h-5 text-green-500" />
                        </h3>
                        {option.description && (
                          <p className="text-sm text-charcoal">
                            {option.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          )}
          {/* Navigation Buttons */}
          <div className="flex md:flex-row flex-col gap-4">
            <Button
              size={"lg"}
              variant={"primary"}
              onClick={handleNext}
              disabled={currentStep > steps.length}
            >
              {currentStep === steps.length ? "Submit" : "Next"}
            </Button>
            <Button
              variant="secondary"
              size={"lg"}
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePolicy;
