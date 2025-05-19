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
import { LoaderIcon } from "lucide-react";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import Select from "react-select";
import { MachineResponse } from "@/types/machineTypes";
import { fetchMachines } from "@/helperFunctions.ts/machineHelperFunctions";
import { Part, partSchema } from "@/features/partFeatures";

const Page = () => {
  const { data: machineData, isLoading: machineLoading } =
    useQuery<MachineResponse | null>({
      queryKey: ["part-machine-list"],
      queryFn: fetchMachines,
    });

  const machineOptions = useMemo(() => {
    return machineData
      ? machineData.payload.map((machine) => ({
          label: machine.machine_make + " - " + machine.machine_type,
          value: machine.id,
        }))
      : [];
  }, [machineData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Part>({
    resolver: zodResolver(partSchema),
  });

  const queryClient = useQueryClient();

  const addPartMutation = useMutation<axiosReturnType, AxiosError, Part>({
    mutationFn: (newPart) => {
      return axiosFunction({
        urlPath: "/parts",
        data: newPart,
        method: "POST",
        isServer: true,
      });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      console.log("Mutation error creating part:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["part-list"],
      });
      reset();
      toast.success("Part added successfully!");
    },
  });

  const onSubmit = (data: Part) => {
    addPartMutation.mutate(data);
  };

  if (machineLoading) {
    return <Loader />;
  }
  return (
    <Card className="w-full shadow-none border-0">
      <CardHeader className="border-b py-4">
        <CardTitle className="tracking-tight text-lg font-semibold flex justify-between items-center">
          <span className="flex items-center gap-2">Add Part Setup</span>
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
                <Label className="text-charcoal" htmlFor="analysis_type">
                  Analysis Type <span className="text-red-500"> *</span>
                </Label>
                <Controller
                  name="analysis_type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        {
                          label: "Gas",
                          value: "Gas",
                        },
                        {
                          label: "Fuel",
                          value: "Fuel",
                        },
                        {
                          label: "Diesel",
                          value: "Diesel",
                        },
                      ]}
                      placeholder="Select analysis type..."
                      isClearable
                      isSearchable
                      onChange={(selectedOption) =>
                        field.onChange(
                          selectedOption ? selectedOption.value.toString() : ""
                        )
                      }
                      value={[
                        {
                          label: "Gas",
                          value: "Gas",
                        },
                        {
                          label: "Fuel",
                          value: "Fuel",
                        },
                        {
                          label: "Diesel",
                          value: "Diesel",
                        },
                      ].find(
                        (option) =>
                          option.value.toString() === String(field.value)
                      )}
                    />
                  )}
                />
                {errors.analysis_type && (
                  <p className="text-red-500 text-xs">
                    {errors.analysis_type.message}
                  </p>
                )}
              </div>

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
                <Label className="text-charcoal" htmlFor="part_kind">
                  Part Kind <span className="text-red-500"> *</span>
                </Label>
                <Controller
                  name="part_kind"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        {
                          label: "Engine on natural gas",
                          value: "Engine on natural gas",
                        },
                      ]}
                      placeholder="Select part kind..."
                      isClearable
                      isSearchable
                      onChange={(selectedOption) =>
                        field.onChange(
                          selectedOption ? selectedOption.value.toString() : ""
                        )
                      }
                      value={[
                        {
                          label: "Engine on natural gas",
                          value: "Engine on natural gas",
                        },
                      ].find(
                        (option) =>
                          option.value.toString() === String(field.value)
                      )}
                    />
                  )}
                />
                {errors.part_kind && (
                  <p className="text-red-500 text-xs">
                    {errors.part_kind.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="w-1/2">
                  <Label className="text-charcoal" htmlFor="part_make">
                    Part Make <span className="text-red-500"> *</span>
                  </Label>
                  <Controller
                    name="part_make"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          {
                            label: "Caterpillar",
                            value: "Caterpillar",
                          },
                        ]}
                        placeholder="Select part make..."
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
                            label: "Caterpillar",
                            value: "Caterpillar",
                          },
                        ].find(
                          (option) =>
                            option.value.toString() === String(field.value)
                        )}
                      />
                    )}
                  />
                  {errors.part_make && (
                    <p className="text-red-500 text-xs">
                      {errors.part_make.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <Label className="text-charcoal" htmlFor="other_part_make">
                    Other Part Make
                  </Label>
                  <Input
                    {...register("other_part_make")}
                    type="text"
                    placeholder="Enter other part make"
                    className="w-full rounded-sm h-10"
                    id="other_part_make"
                  />
                  {errors.other_part_make && (
                    <p className="text-red-500 text-xs">
                      {errors.other_part_make.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="w-1/2">
                  <Label className="text-charcoal" htmlFor="part_type">
                    Part Type <span className="text-red-500"> *</span>
                  </Label>
                  <Controller
                    name="part_type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          {
                            label: "Demo 01",
                            value: "Demo 01",
                          },
                          {
                            label: "Demo 02",
                            value: "Demo 02",
                          },
                        ]}
                        placeholder="Select part type..."
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
                            label: "Demo 01",
                            value: "Demo 01",
                          },
                          {
                            label: "Demo 02",
                            value: "Demo 02",
                          },
                        ].find(
                          (option) =>
                            option.value.toString() === String(field.value)
                        )}
                      />
                    )}
                  />
                  {errors.part_type && (
                    <p className="text-red-500 text-xs">
                      {errors.part_type.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <Label className="text-charcoal" htmlFor="other_part_type">
                    Other Part Type
                  </Label>
                  <Input
                    {...register("other_part_type")}
                    type="text"
                    placeholder="Enter other part type"
                    className="w-full h-10 rounded-sm"
                    id="other_part_type"
                  />
                  {errors.other_part_type && (
                    <p className="text-red-500 text-xs">
                      {errors.other_part_type.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="w-1/2">
                  <Label className="text-charcoal" htmlFor="part_info">
                    Part Info <span className="text-red-500"> *</span>
                  </Label>
                  <Input
                    {...register("part_info")}
                    type="text"
                    placeholder="Enter part info"
                    className="w-full h-10 rounded-sm"
                    id="part_info"
                  />
                  {errors.part_info && (
                    <p className="text-red-500 text-xs">
                      {errors.part_info.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <Label className="text-charcoal" htmlFor="part_id">
                    Part ID
                  </Label>
                  <Input
                    {...register("part_id")}
                    type="text"
                    placeholder="Enter part ID"
                    className="w-full h-10 rounded-sm"
                    id="part_id"
                  />
                  {errors.part_id && (
                    <p className="text-red-500 text-xs">
                      {errors.part_id.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="capacity_in_ltrs">
                  Capacity in Ltrs <span className="text-red-500"> *</span>
                </Label>
                <Input
                  {...register("capacity_in_ltrs",{ valueAsNumber: true })}
                  type="text"
                  placeholder="Enter capacity in Ltrs"
                  className="w-full rounded-sm h-10"
                  id="capacity_in_ltrs"
                />
                {errors.capacity_in_ltrs && (
                  <p className="text-red-500 text-xs">
                    {errors.capacity_in_ltrs.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="bi_carbunation">
                  Bi Carbunation <span className="text-red-500"> *</span>
                </Label>
                <Controller
                  name="bi_carbunation"
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
                      placeholder="Select bi carbunation..."
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
                {errors.bi_carbunation && (
                  <p className="text-red-500 text-xs">
                    {errors.bi_carbunation.message}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant={`${addPartMutation.isPending ? "secondary" : "primary"}`}
              size="lg"
              className="md:w-max w-full disabled:cursor-not-allowed"
              type="submit"
              disabled={addPartMutation.isPending}
            >
              Submit
              {addPartMutation.isPending && (
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
