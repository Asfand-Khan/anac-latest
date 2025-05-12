"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Customer, customerSchema } from "@/features/customerFeatures";
import axiosFunction, { axiosReturnType } from "@/utils/axiosFunction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
  });

  const queryClient = useQueryClient();

  const addCustomerMutation = useMutation<
    axiosReturnType,
    AxiosError,
    Customer
  >({
    mutationFn: (newCustomer) => {
      return axiosFunction({
        urlPath: "/customers",
        data: newCustomer,
        method: "POST",
        isServer: true,
      });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      console.log("Mutation error creating customer:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customer-list"],
      });
      reset();
      toast.success("Customer added successfully!");
    },
  });

  const onSubmit = (data: Customer) => {
    console.log(data);
    addCustomerMutation.mutate(data);
  };
  return (
    <Card className="w-full shadow-none border-0">
      <CardHeader className="border-b py-4">
        <CardTitle className="tracking-tight text-lg font-semibold flex justify-between items-center">
          <span className="flex items-center gap-2">Add Customer Setup</span>
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
                <Label className="text-charcoal" htmlFor="customer_code">
                  Customer Code<span className="text-red-500"> *</span>
                </Label>
                <Input
                  {...register("customer_code")}
                  type="text"
                  placeholder="Enter customer code"
                  className="w-full"
                  id="customer_code"
                />
                {errors.customer_code && (
                  <p className="text-red-500 text-xs">
                    {errors.customer_code.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="customer_name">
                  Customer Name<span className="text-red-500"> *</span>
                </Label>
                <Input
                  {...register("customer_name")}
                  type="text"
                  placeholder="Enter customer name"
                  className="w-full"
                  id="customer_name"
                />
                {errors.customer_name && (
                  <p className="text-red-500 text-xs">
                    {errors.customer_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="contact_no">
                  Contact No<span className="text-red-500"> *</span>
                </Label>
                <Input
                  {...register("contact_no")}
                  type="text"
                  placeholder="Enter contact no"
                  className="w-full"
                  id="contact_no"
                />
                {errors.contact_no && (
                  <p className="text-red-500 text-xs">
                    {errors.contact_no.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="address">
                  Address<span className="text-red-500"> *</span>
                </Label>
                <Input
                  {...register("address")}
                  type="text"
                  placeholder="Enter address"
                  className="w-full"
                  id="address"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal" htmlFor="contact_person">
                  Contact Person<span className="text-red-500"> *</span>
                </Label>
                <Input
                  {...register("contact_person")}
                  type="text"
                  placeholder="Enter contact person"
                  className="w-full"
                  id="contact_person"
                />
                {errors.contact_person && (
                  <p className="text-red-500 text-xs">
                    {errors.contact_person.message}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant={`${
                addCustomerMutation.isPending ? "secondary" : "primary"
              }`}
              size="lg"
              className="md:w-max w-full disabled:cursor-not-allowed"
              type="submit"
              disabled={addCustomerMutation.isPending}
            >
              Submit
              {addCustomerMutation.isPending && (
                <LoaderIcon className="animate-spin ml-2" />
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default page;
