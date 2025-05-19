"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/global/Loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Unit, unitSchema } from "@/features/unitFeatures";
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

const Page = () => {
  const { data: customerData, isLoading: customerLoading } =
    useQuery<CustomerResponse | null>({
      queryKey: ["unit-customer-list"],
      queryFn: fetchCustomers,
    });

  const customerOptions = useMemo(() => {
    return customerData
      ? customerData.payload.map((customer) => ({
          label: customer.customer_name,
          value: customer.id,
        }))
      : [];
  }, [customerData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Unit>({
    resolver: zodResolver(unitSchema),
  });

  const queryClient = useQueryClient();

  const addUnitMutation = useMutation<axiosReturnType, AxiosError, Unit>({
    mutationFn: (newUnit) => {
      return axiosFunction({
        urlPath: "/units",
        data: newUnit,
        method: "POST",
        isServer: true,
      });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      console.log("Mutation error creating unit:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["unit-list"],
      });
      reset();
      toast.success("Unit added successfully!");
    },
  });

  const onSubmit = (data: Unit) => {
    const dataToSend = {
        ...data,
        customer_id: String(data.customer_id),
    }
    addUnitMutation.mutate(dataToSend);
  };

  if (customerLoading) {
    return <Loader />;
  }
  return (
    <Card className="w-full shadow-none border-0">
      <CardHeader className="border-b py-4">
        <CardTitle className="tracking-tight text-lg font-semibold flex justify-between items-center">
          <span className="flex items-center gap-2">Add Unit Setup</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <div className="pt-6 w-full">
          <form
            className="w-full flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-6 lg:w-1/2 w-full">
              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="unit_code">
                  Unit Code<span className="text-red-500"> *</span>
                </Label>
                <Input
                  {...register("unit_code")}
                  type="text"
                  placeholder="Enter unit code"
                  className="w-full"
                  id="unit_code"
                />
                {errors.unit_code && (
                  <p className="text-red-500 text-xs">
                    {errors.unit_code.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="unit_name">
                  Unit Name<span className="text-red-500"> *</span>
                </Label>
                <Input
                  {...register("unit_name")}
                  type="text"
                  placeholder="Enter unit name"
                  className="w-full"
                  id="unit_name"
                />
                {errors.unit_name && (
                  <p className="text-red-500 text-xs">
                    {errors.unit_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="unit_contact">
                  Contact No<span className="text-red-500"> *</span>
                </Label>
                <Input
                  {...register("unit_contact")}
                  type="text"
                  placeholder="Enter contact"
                  className="w-full"
                  id="unit_contact"
                />
                {errors.unit_contact && (
                  <p className="text-red-500 text-xs">
                    {errors.unit_contact.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="unit_address">
                  Address<span className="text-red-500"> *</span>
                </Label>
                <Input
                  {...register("unit_address")}
                  type="text"
                  placeholder="Enter address"
                  className="w-full"
                  id="unit_address"
                />
                {errors.unit_address && (
                  <p className="text-red-500 text-xs">
                    {errors.unit_address.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="unit_contact_person">
                  Contact Person<span className="text-red-500"> *</span>
                </Label>
                <Input
                  {...register("unit_contact_person")}
                  type="text"
                  placeholder="Enter contact person"
                  className="w-full"
                  id="unit_contact_person"
                />
                {errors.unit_contact_person && (
                  <p className="text-red-500 text-xs">
                    {errors.unit_contact_person.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="customer_id">
                  Branch <span className="text-red-500"> *</span>
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
                        (option) => option.value.toString() === String(field.value)
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
            </div>
            <Button
              variant={`${addUnitMutation.isPending ? "secondary" : "primary"}`}
              size="lg"
              className="md:w-max w-full disabled:cursor-not-allowed"
              type="submit"
              disabled={addUnitMutation.isPending}
            >
              Submit
              {addUnitMutation.isPending && (
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
