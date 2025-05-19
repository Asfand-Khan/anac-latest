"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/global/Loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchCustomers } from "@/helperFunctions.ts/customerHelperFunctions";
import { CustomerResponse } from "@/types/customerTypes";
import axiosFunction, { axiosReturnType } from "@/utils/axiosFunction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderIcon } from "lucide-react";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import Select from "react-select";
import { machineSchema, Machine } from "@/features/machineFeatures";
import { UnitResponse } from "@/types/unitTypes";
import { fetchUnits } from "@/helperFunctions.ts/unitHelperFunctions";

const Page = () => {
  const { data: customerData, isLoading: customerLoading } =
    useQuery<CustomerResponse | null>({
      queryKey: ["machine-customer-list"],
      queryFn: fetchCustomers,
    });

  const { data: unitData, isLoading: unitLoading } =
    useQuery<UnitResponse | null>({
      queryKey: ["machine-unit-list"],
      queryFn: fetchUnits,
    });

  const customerOptions = useMemo(() => {
    return customerData
      ? customerData.payload.map((customer) => ({
          label: customer.customer_name,
          value: customer.id,
        }))
      : [];
  }, [customerData]);

  const unitOptions = useMemo(() => {
    return unitData
      ? unitData.payload.map((unit) => ({
          label: unit.unit_name,
          value: unit.id,
        }))
      : [];
  }, [unitData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Machine>({
    resolver: zodResolver(machineSchema),
  });

  const queryClient = useQueryClient();

  const addMachineMutation = useMutation<axiosReturnType, AxiosError, Machine>({
    mutationFn: (newMachine) => {
      return axiosFunction({
        urlPath: "/machines",
        data: newMachine,
        method: "POST",
        isServer: true,
      });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      console.log("Mutation error creating machine:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["machine-list"],
      });
      reset();
      toast.success("Machine added successfully!");
    },
  });

  const onSubmit = (data: Machine) => {
    console.log(errors);
    const dataToSend = {
      ...data,
      customer_id: String(data.customer_id),
      unit_id: String(data.unit_id),
    };
    addMachineMutation.mutate(dataToSend);
  };

  if (customerLoading || unitLoading) {
    return <Loader />;
  }
  return (
    <Card className="w-full shadow-none border-0">
      <CardHeader className="border-b py-4">
        <CardTitle className="tracking-tight text-lg font-semibold flex justify-between items-center">
          <span className="flex items-center gap-2">Add Machine Setup</span>
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
                <Label className="text-charcoal" htmlFor="customer_id">
                  Customer <span className="text-red-500"> *</span>
                </Label>
                <Controller
                  name="customer_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={customerOptions}
                      placeholder="Select customer..."
                      isClearable
                      isSearchable
                      onChange={(selectedOption) =>
                        field.onChange(
                          selectedOption ? selectedOption.value.toString() : ""
                        )
                      }
                      value={customerOptions.find(
                        (option) =>
                          option.value.toString() === String(field.value)
                      )}
                    />
                  )}
                />
                {errors.customer_id && (
                  <p className="text-red-500 text-xs">
                    {errors.customer_id.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="unit_id">
                  Unit <span className="text-red-500"> *</span>
                </Label>
                <Controller
                  name="unit_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={unitOptions}
                      placeholder="Select unit..."
                      isClearable
                      isSearchable
                      onChange={(selectedOption) =>
                        field.onChange(
                          selectedOption ? selectedOption.value.toString() : ""
                        )
                      }
                      value={unitOptions.find(
                        (option) =>
                          option.value.toString() === String(field.value)
                      )}
                    />
                  )}
                />
                {errors.unit_id && (
                  <p className="text-red-500 text-xs">
                    {errors.unit_id.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="machine_kind">
                  Machine Kind <span className="text-red-500"> *</span>
                </Label>
                <Controller
                  name="machine_kind"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        {
                          label: "Industrial Machine",
                          value: "Industrial Machine",
                        },
                        {
                          label: "Commercial Machine",
                          value: "Commercial Machine",
                        },
                      ]}
                      placeholder="Select machine kind..."
                      isClearable
                      isSearchable
                      onChange={(selectedOption) =>
                        field.onChange(
                          selectedOption ? selectedOption.value.toString() : ""
                        )
                      }
                      value={[
                        {
                          label: "Industrial Machine",
                          value: "Industrial Machine",
                        },
                        {
                          label: "Commercial Machine",
                          value: "Commercial Machine",
                        },
                      ].find(
                        (option) =>
                          option.value.toString() === String(field.value)
                      )}
                    />
                  )}
                />
                {errors.machine_kind && (
                  <p className="text-red-500 text-xs">
                    {errors.machine_kind.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="w-1/2">
                  <Label className="text-charcoal" htmlFor="machine_make">
                    Machine Make <span className="text-red-500"> *</span>
                  </Label>
                  <Controller
                    name="machine_make"
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
                        placeholder="Select machine make..."
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
                  {errors.machine_make && (
                    <p className="text-red-500 text-xs">
                      {errors.machine_make.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <Label className="text-charcoal" htmlFor="other_machine_make">
                    Other Machine Make
                  </Label>
                  <Input
                    {...register("other_machine_make")}
                    type="text"
                    placeholder="Enter other machine make"
                    className="w-full rounded-sm h-10"
                    id="unit_name"
                  />
                  {errors.other_machine_make && (
                    <p className="text-red-500 text-xs">
                      {errors.other_machine_make.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="w-1/2">
                  <Label className="text-charcoal" htmlFor="machine_type">
                    Machine Type <span className="text-red-500"> *</span>
                  </Label>
                  <Controller
                    name="machine_type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          {
                            label: "3510",
                            value: "3510",
                          },
                          {
                            label: "3511",
                            value: "3511",
                          },
                          {
                            label: "3512",
                            value: "3512",
                          },
                          {
                            label: "3513",
                            value: "3513",
                          },
                        ]}
                        placeholder="Select machine type..."
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
                            label: "3510",
                            value: "3510",
                          },
                          {
                            label: "3511",
                            value: "3511",
                          },
                          {
                            label: "3512",
                            value: "3512",
                          },
                          {
                            label: "3513",
                            value: "3513",
                          },
                        ].find(
                          (option) =>
                            option.value.toString() === String(field.value)
                        )}
                      />
                    )}
                  />
                  {errors.machine_type && (
                    <p className="text-red-500 text-xs">
                      {errors.machine_type.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <Label className="text-charcoal" htmlFor="other_machine_type">
                    Other Machine Type
                  </Label>
                  <Input
                    {...register("other_machine_type")}
                    type="text"
                    placeholder="Enter other machine type"
                    className="w-full h-10 rounded-sm"
                    id="other_machine_type"
                  />
                  {errors.other_machine_type && (
                    <p className="text-red-500 text-xs">
                      {errors.other_machine_type.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="w-1/3">
                  <Label className="text-charcoal" htmlFor="machine_info1">
                    Machine Info 01
                  </Label>
                  <Input
                    {...register("machine_info1")}
                    type="text"
                    placeholder="Enter machine info 1"
                    className="w-full"
                    id="machine_info1"
                  />
                  {errors.machine_info1 && (
                    <p className="text-red-500 text-xs">
                      {errors.machine_info1.message}
                    </p>
                  )}
                </div>
                <div className="w-1/3">
                  <Label className="text-charcoal" htmlFor="machine_info2">
                    Machine Info 02
                  </Label>
                  <Input
                    {...register("machine_info2")}
                    type="text"
                    placeholder="Enter machine info 2"
                    className="w-full"
                    id="machine_info2"
                  />
                  {errors.machine_info2 && (
                    <p className="text-red-500 text-xs">
                      {errors.machine_info2.message}
                    </p>
                  )}
                </div>
                <div className="w-1/3">
                  <Label className="text-charcoal" htmlFor="machine_id">
                    Machine ID
                  </Label>
                  <Input
                    {...register("machine_id")}
                    type="text"
                    placeholder="Enter machine ID"
                    className="w-full"
                    id="machine_id"
                  />
                  {errors.machine_id && (
                    <p className="text-red-500 text-xs">
                      {errors.machine_id.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant={`${
                addMachineMutation.isPending ? "secondary" : "primary"
              }`}
              size="lg"
              className="md:w-max w-full disabled:cursor-not-allowed"
              type="submit"
              disabled={addMachineMutation.isPending}
            >
              Submit
              {addMachineMutation.isPending && (
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
