"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ChevronsUpDown,
  CreditCard,
  DollarSign,
  FileText,
  File,
  Check,
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
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";

const vehicles = [
  { make: "SUZUKI", models: ["BALENO", "SWIFT", "VITARA"] },
  { make: "TOYOTA", models: ["COROLLA", "CAMRY", "RAV4"] },
  { make: "HONDA", models: ["CIVIC", "ACCORD", "CR-V"] },
];

const products = [
  "Private Car Comprehensive Insurance - Suzuki",
  "Private Car Third Party Insurance - Suzuki",
  "Commercial Vehicle Insurance - Suzuki",
];

const paymentOptions = [
  {
    id: "credit-card",
    icon: <CreditCard className="w-6 h-6 text-blue-500" />,
    title: "Credit Card",
    description: "You will be redirected to Credit/Debit Card Payment Page.",
  },
  {
    id: "cash-on-delivery",
    icon: <DollarSign className="w-6 h-6 text-green-500" />,
    title: "Cash On Delivery",
    description:
      "Additional cash to be paid by the client to Courier Partner separately for Cash on Delivery orders.",
  },
  {
    id: "cheque-on-order",
    icon: <FileText className="w-6 h-6 text-gray-500" />,
    title: "Cheque On Order",
    description: "",
  },
  {
    id: "cheque-on-delivery",
    icon: <File className="w-6 h-6 text-yellow-500" />,
    title: "Cheque On Delivery",
    description:
      "Additional cash to be paid by the client to Courier Partner separately for Cheque on Delivery orders.",
  },
];

const CreatePolicy = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [vehicleMakeOpen, setVehicleMakeOpen] = useState(false);
  const [formData, setFormData] = useState({
    product: "",
    vehicleMake: "",
    vehicleModel: "",
    insuranceValue: "",
    premiumRate: "",
  });
  const [open, setOpen] = React.useState(false);

  const steps = [
    { number: 1, title: "Machine Creation" },
    { number: 2, title: "Part" },
    { number: 3, title: "Sample" },
    { number: 4, title: "Confirmation" },
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
      <div className="pt-6 grid lg:grid-cols-2 grid-cols-1 gap-6 mx-auto">
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
                {steps[0]?.title}
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
                              placeholder="Search products..."
                              className="h-11"
                            />
                            <CommandEmpty>No product found.</CommandEmpty>
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
                      <Label htmlFor="vehicleMake">
                        Machine Kind <span className="text-red-500">*</span>
                      </Label>
                      <Popover
                        open={vehicleMakeOpen}
                        onOpenChange={setVehicleMakeOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="lg"
                            role="combobox"
                            className="w-full justify-between px-3 capitalize hover:bg-transparent"
                          >
                            {formData.vehicleMake || "Select Kind..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                          <Command>
                            <CommandInput
                              placeholder="Search makes..."
                              className="h-11"
                            />
                            <CommandEmpty>No make found.</CommandEmpty>
                            <CommandGroup>
                              {vehicles.map((vehicle) => (
                                <CommandItem
                                  key={vehicle.make}
                                  onSelect={() => {
                                    setFormData({
                                      ...formData,
                                      vehicleMake: vehicle.make,
                                    });
                                    setVehicleMakeOpen(false); // Close popover on select
                                  }}
                                >
                                  {vehicle.make}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      formData.vehicleMake === vehicle.make
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
                        Machine Make <span className="text-red-500">*</span>
                      </Label>
                      <Popover
                        open={vehicleMakeOpen}
                        onOpenChange={setVehicleMakeOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="lg"
                            role="combobox"
                            className="w-full justify-between px-3 capitalize hover:bg-transparent"
                          >
                            {formData.vehicleMake || "Select Make..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                          <Command>
                            <CommandInput
                              placeholder="Search makes..."
                              className="h-11"
                            />
                            <CommandEmpty>No make found.</CommandEmpty>
                            <CommandGroup>
                              {vehicles.map((vehicle) => (
                                <CommandItem
                                  key={vehicle.make}
                                  onSelect={() => {
                                    setFormData({
                                      ...formData,
                                      vehicleMake: vehicle.make,
                                    });
                                    setVehicleMakeOpen(false); // Close popover on select
                                  }}
                                >
                                  {vehicle.make}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      formData.vehicleMake === vehicle.make
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
                      {formData.insuranceValue && (
                        <p className="text-sm text-gray-600">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "PKR",
                          }).format(Number(formData.insuranceValue))}{" "}
                          only
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h1 className="text-base font-medium">
                    Business Unit Information
                  </h1>
                  {/* Premium Rate */}
                  <div className="space-y-2">
                    <Label>Premium Rate</Label>
                    <Input
                      placeholder="Premium Rate"
                      value={formData.premiumRate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          premiumRate: e.target.value,
                        })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h1 className="text-lg text-primary-100 font-semibold underline">
                {steps[1]?.title}
              </h1>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-base font-medium">Product Information</h1>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="product">
                        Product <span className="text-red-500">*</span>
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
                            {formData.product || "Select product..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                          <Command>
                            <CommandInput
                              placeholder="Search products..."
                              className="h-11"
                            />
                            <CommandEmpty>No product found.</CommandEmpty>
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
                      <Label htmlFor="vehicleMake">
                        Vehicle Make <span className="text-red-500">*</span>
                      </Label>
                      <Popover
                        open={vehicleMakeOpen}
                        onOpenChange={setVehicleMakeOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="lg"
                            role="combobox"
                            className="w-full justify-between px-3 capitalize hover:bg-transparent"
                          >
                            {formData.vehicleMake || "Select make..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-lg shadow-md border border-gray-200 bg-white">
                          <Command>
                            <CommandInput
                              placeholder="Search makes..."
                              className="h-11"
                            />
                            <CommandEmpty>No make found.</CommandEmpty>
                            <CommandGroup>
                              {vehicles.map((vehicle) => (
                                <CommandItem
                                  key={vehicle.make}
                                  onSelect={() => {
                                    setFormData({
                                      ...formData,
                                      vehicleMake: vehicle.make,
                                    });
                                    setVehicleMakeOpen(false); // Close popover on select
                                  }}
                                >
                                  {vehicle.make}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      formData.vehicleMake === vehicle.make
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
                      {formData.insuranceValue && (
                        <p className="text-sm text-gray-600">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "PKR",
                          }).format(Number(formData.insuranceValue))}{" "}
                          only
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h1 className="text-lg text-primary-100 font-semibold underline">
                {steps[2]?.title}
              </h1>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-base font-medium">
                    Motor Premium Payable
                  </h1>
                  <div className="p-4 rounded-lg border border-gray-300">
                    <h3 className="text-lg font-semibold text-gray-700 text-center mb-2">
                      Preview
                    </h3>
                    <div className="border-t border-gray-300 my-2"></div>

                    {/* Table Header */}
                    <div className="flex justify-between text-sm font-semibold text-gray-500 uppercase">
                      <span>Name</span>
                      <span>Premium</span>
                    </div>
                    <div className="border-t border-gray-300 my-2"></div>

                    {/* Row */}
                    <div className="flex justify-between items-center py-3">
                      <div className="flex items-center space-x-2">
                        {/* Icon */}
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          {/* Replace with Shadcn Icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-gray-600"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M5 11h14V9l-4-3H9L5 9v2zm14 2H5v5h2v-2h10v2h2v-5z" />
                          </svg>
                        </div>
                        <span className="text-gray-700">
                          Motor Cycles Third Party Liability Insurance
                        </span>
                      </div>
                      <span className="text-gray-800 font-medium">PKR 289</span>
                    </div>
                    <div className="border-t border-gray-300 my-2"></div>

                    {/* Grand Total */}
                    <div className="flex justify-between items-center pt-2 font-semibold text-gray-800">
                      <span>Grand Total</span>
                      <span>PKR 289</span>
                    </div>
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
                <h1 className="text-base font-medium">Payment Method</h1>
                <div className="space-y-6">
                  {paymentOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                    >
                      {/* Icon */}
                      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-2xl">
                        {option.icon}
                      </div>

                      {/* Content */}
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
                  ))}
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
              disabled={currentStep === steps.length}
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
