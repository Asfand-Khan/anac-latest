"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/global/Loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosFunction, { axiosReturnType } from "@/utils/axiosFunction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CalendarIcon, LoaderIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import Select from "react-select";
import { MachineResponse } from "@/types/machineTypes";
import { fetchMachines } from "@/helperFunctions.ts/machineHelperFunctions";
import { PartResponse } from "@/types/partTypes";
import { fetchParts } from "@/helperFunctions.ts/partHelperFunctions";
import { Sample, sampleSchema } from "@/features/sampleFeatures";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const Page = () => {
  const { data: machineData, isLoading: machineLoading } =
    useQuery<MachineResponse | null>({
      queryKey: ["sample-machine-list"],
      queryFn: fetchMachines,
    });

  const { data: partData, isLoading: partLoading } =
    useQuery<PartResponse | null>({
      queryKey: ["sample-part-list"],
      queryFn: fetchParts,
    });

  const machineOptions = useMemo(() => {
    return machineData
      ? machineData.payload.map((machine) => ({
          label: machine.machine_make + " - " + machine.machine_type,
          value: machine.id,
        }))
      : [];
  }, [machineData]);

  const partOptions = useMemo(() => {
    return partData
      ? partData.payload.map((part) => ({
          label: part.id + " - " + part.analysis_type,
          value: part.id,
        }))
      : [];
  }, [partData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
    setValue,
  } = useForm<Sample>({
    resolver: zodResolver(sampleSchema),
  });

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const addSampleMutation = useMutation<axiosReturnType, AxiosError, Sample>({
    mutationFn: (newSample) => {
      return axiosFunction({
        urlPath: "/samples",
        data: newSample,
        method: "POST",
        isServer: true,
      });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      console.log("Mutation error creating sample:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sample-list"],
      });
      reset();
      toast.success("Sample added successfully!");
    },
  });

  const onSubmit = (data: Sample) => {
    console.log(data);
    addSampleMutation.mutate(data);
  };

  if (machineLoading || partLoading) {
    return <Loader />;
  }
  return (
    <Card className="w-full shadow-none border-0">
      <CardHeader className="border-b py-4">
        <CardTitle className="tracking-tight text-lg font-semibold flex justify-between items-center">
          <span className="flex items-center gap-2">Add Sample Setup</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <div className="pt-6 w-full">
          <form
            className="w-full flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-6 w-full">
              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="machine_id">
                  Machine <span className="text-red-500"> *</span>
                </Label>
                <Controller
                  name="machine_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={machineOptions}
                      placeholder="Select machine..."
                      isClearable
                      isSearchable
                      onChange={(selectedOption) =>
                        field.onChange(
                          selectedOption ? selectedOption.value.toString() : ""
                        )
                      }
                      value={machineOptions.find(
                        (option) =>
                          option.value.toString() === String(field.value)
                      )}
                    />
                  )}
                />
                {errors.machine_id && (
                  <p className="text-red-500 text-xs">
                    {errors.machine_id.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="part_id">
                  Part <span className="text-red-500"> *</span>
                </Label>
                <Controller
                  name="part_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={partOptions}
                      placeholder="Select part..."
                      isClearable
                      isSearchable
                      onChange={(selectedOption) =>
                        field.onChange(
                          selectedOption ? selectedOption.value.toString() : ""
                        )
                      }
                      value={partOptions.find(
                        (option) =>
                          option.value.toString() === String(field.value)
                      )}
                    />
                  )}
                />
                {errors.part_id && (
                  <p className="text-red-500 text-xs">
                    {errors.part_id.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="barcode_no">
                  Barcode No <span className="text-red-500"> *</span>
                </Label>
                <Input
                  {...register("barcode_no")}
                  type="text"
                  placeholder="Enter barcode no"
                  className="w-full h-10 rounded-sm"
                  id="barcode_no"
                />
                {errors.barcode_no && (
                  <p className="text-red-500 text-xs">
                    {errors.barcode_no.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="sample_date">
                  Sample date <span className="text-red-500"> *</span>
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className={cn(
                        "w-full justify-start text-left font-normal px-3 hover:bg-transparent",
                        !getValues("sample_date") && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {getValues("sample_date") ? (
                        format(new Date(getValues("sample_date")), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        getValues("sample_date")
                          ? new Date(getValues("sample_date"))
                          : undefined
                      }
                      onSelect={(date) => {
                        if (date) {
                          setValue("sample_date", format(date, "yyyy-MM-dd"));
                          setOpen(false);
                        }
                      }}
                      className="w-full"
                    />
                  </PopoverContent>
                </Popover>
                {errors.sample_date && (
                  <p className="text-red-500 text-xs">
                    {errors.sample_date.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="intermediate_sample">
                  Intermediate sample <span className="text-red-500"> *</span>
                </Label>
                <Controller
                  name="intermediate_sample"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        {
                          label: "True",
                          value: true,
                        },
                        {
                          label: "False",
                          value: false,
                        },
                      ]}
                      placeholder="Select intermediate sample..."
                      isClearable
                      isSearchable
                      onChange={(selectedOption) =>
                        field.onChange(
                          selectedOption ? selectedOption.value : null
                        )
                      }
                      value={[
                        {
                          label: "True",
                          value: true,
                        },
                        {
                          label: "False",
                          value: false,
                        },
                      ].find((option) => Boolean(option.value) === field.value)}
                    />
                  )}
                />
                {errors.intermediate_sample && (
                  <p className="text-red-500 text-xs">
                    {errors.intermediate_sample.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <span>Machine Information</span>
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="w-1/2">
                  <Label className="text-charcoal" htmlFor="total_mileage">
                    Total mileage <span className="text-red-500"> *</span>
                  </Label>
                  <Input
                    {...register("total_mileage")}
                    type="text"
                    placeholder="Enter total mileage"
                    className="w-full rounded-sm h-10"
                    id="total_mileage"
                  />
                  {errors.total_mileage && (
                    <p className="text-red-500 text-xs">
                      {errors.total_mileage.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <Label className="text-charcoal" htmlFor="mileage_unit">
                    Mileage unit <span className="text-red-500"> *</span>
                  </Label>
                  <Controller
                    name="mileage_unit"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          {
                            label: "Hour",
                            value: "Hour",
                          },
                          {
                            label: "Day",
                            value: "Day",
                          },
                          {
                            label: "Minute",
                            value: "Minute",
                          },
                        ]}
                        placeholder="Select mileage unit..."
                        isClearable
                        isSearchable
                        onChange={(selectedOption) =>
                          field.onChange(
                            selectedOption
                              ? selectedOption.value.toString()
                              : ""
                          )
                        }
                        value={[
                          {
                            label: "Hour",
                            value: "Hour",
                          },
                          {
                            label: "Day",
                            value: "Day",
                          },
                          {
                            label: "Minute",
                            value: "Minute",
                          },
                        ].find(
                          (option) =>
                            option.value.toString() === String(field.value)
                        )}
                      />
                    )}
                  />
                  {errors.mileage_unit && (
                    <p className="text-red-500 text-xs">
                      {errors.mileage_unit.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="fluid_time">
                  Fluid time <span className="text-red-500"> *</span>
                </Label>
                <Input
                  {...register("fluid_time")}
                  type="text"
                  placeholder="Enter fluid time"
                  className="w-full h-10 rounded-sm"
                  id="fluid_time"
                />
                {errors.fluid_time && (
                  <p className="text-red-500 text-xs">
                    {errors.fluid_time.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="w-1/2">
                  <Label className="text-charcoal" htmlFor="top_up">
                    Top up <span className="text-red-500"> *</span>
                  </Label>
                  <Input
                    {...register("top_up")}
                    type="text"
                    placeholder="Enter top up"
                    className="w-full rounded-sm h-10"
                    id="top_up"
                  />
                  {errors.top_up && (
                    <p className="text-red-500 text-xs">
                      {errors.top_up.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <Label className="text-charcoal" htmlFor="top_up_unit">
                    Top up unit <span className="text-red-500"> *</span>
                  </Label>
                  <Controller
                    name="top_up_unit"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          {
                            label: "Litre",
                            value: "Litre",
                          },
                        ]}
                        placeholder="Select top up unit..."
                        isClearable
                        isSearchable
                        onChange={(selectedOption) =>
                          field.onChange(
                            selectedOption
                              ? selectedOption.value.toString()
                              : ""
                          )
                        }
                        value={[
                          {
                            label: "Litre",
                            value: "Litre",
                          },
                        ].find(
                          (option) =>
                            option.value.toString() === String(field.value)
                        )}
                      />
                    )}
                  />
                  {errors.top_up_unit && (
                    <p className="text-red-500 text-xs">
                      {errors.top_up_unit.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="fluid_name">
                  Fluid name <span className="text-red-500"> *</span>
                </Label>
                <Controller
                  name="fluid_name"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        {
                          label: "TOTAL NITERIA MWX 40",
                          value: "TOTAL NITERIA MWX 40",
                        },
                      ]}
                      placeholder="Select fluid name..."
                      isClearable
                      isSearchable
                      onChange={(selectedOption) =>
                        field.onChange(
                          selectedOption ? selectedOption.value.toString() : ""
                        )
                      }
                      value={[
                        {
                          label: "TOTAL NITERIA MWX 40",
                          value: "TOTAL NITERIA MWX 40",
                        },
                      ].find(
                        (option) =>
                          option.value.toString() === String(field.value)
                      )}
                    />
                  )}
                />
                {errors.fluid_name && (
                  <p className="text-red-500 text-xs">
                    {errors.fluid_name.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="w-1/3">
                  <Label className="text-charcoal" htmlFor="fluid_make">
                    Fluid Make
                  </Label>
                  <Input
                    {...register("fluid_make")}
                    type="text"
                    placeholder="Enter fluid make"
                    className="w-full"
                    id="fluid_make"
                  />
                  {errors.fluid_make && (
                    <p className="text-red-500 text-xs">
                      {errors.fluid_make.message}
                    </p>
                  )}
                </div>
                <div className="w-1/3">
                  <Label className="text-charcoal" htmlFor="fluid_type">
                    Fluid Type
                  </Label>
                  <Input
                    {...register("fluid_type")}
                    type="text"
                    placeholder="Enter fluid type"
                    className="w-full"
                    id="fluid_type"
                  />
                  {errors.fluid_type && (
                    <p className="text-red-500 text-xs">
                      {errors.fluid_type.message}
                    </p>
                  )}
                </div>
                <div className="w-1/3">
                  <Label className="text-charcoal" htmlFor="fluid_grade">
                    Fluid grade
                  </Label>
                  <Input
                    {...register("fluid_grade")}
                    type="text"
                    placeholder="Enter fluid grade"
                    className="w-full"
                    id="fluid_grade"
                  />
                  {errors.fluid_grade && (
                    <p className="text-red-500 text-xs">
                      {errors.fluid_grade.message}
                    </p>
                  )}
                </div>
              </div>

            </div>
            <Button
              variant={`${
                addSampleMutation.isPending ? "secondary" : "primary"
              }`}
              size="lg"
              className="md:w-max w-full disabled:cursor-not-allowed"
              type="submit"
              disabled={addSampleMutation.isPending}
            >
              Submit
              {addSampleMutation.isPending && (
                <LoaderIcon className="animate-spin ml-2" />
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
