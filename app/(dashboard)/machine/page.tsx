"use client";

import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import SubNav from "@/components/ui/global/SubNav";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/ui/global/Loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Machine, MachineResponse } from "@/types/machineTypes";
import { fetchMachines } from "@/helperFunctions.ts/machineHelperFunctions";

const page = () => {
  const router = useRouter();
  const { data: machineData, isLoading: machineLoading } =
    useQuery<MachineResponse | null>({
      queryKey: ["machine-list"],
      queryFn: fetchMachines,
    });

  if (machineLoading) {
    return <Loader />;
  }
  return (
    <>
      <SubNav
        title="Machines"
        showDatePicker={false}
        showDataTableFilters={false}
      />
      <Card className="w-full shadow-none border-0">
        <CardHeader className="border-b py-4">
          <CardTitle className="tracking-tight text-lg font-semibold flex justify-between items-center">
            Explore your machines
            <div>
              <div>
                <Button
                  variant="primary"
                  className="text-left py-1"
                  onClick={() => router.push(`/machine/add-machine`)}
                >
                  Add Machine
                  <Plus className="ml-1 h-4 w-4" size={20} />
                </Button>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={
              [
                {
                  accessorKey: "machine_kind",
                  header: "Machine Kind",
                },
                {
                  accessorKey: "machine_make",
                  header: "Machine Make",
                },
                {
                  accessorKey: "machine_type",
                  header: "Machine Type",
                },
                {
                  accessorKey: "machine_info1",
                  header: "Info 1",
                },
                {
                  accessorKey: "machine_info2",
                  header: "Info 2",
                },
                {
                  accessorKey: "unit.unit_name",
                  header: "Unit Name",
                },
                {
                  header: "Actions",
                  id: "actions",
                  cell: ({ row }) => {
                    const record = row.original;
                    return (
                      <>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 focus-visible:ring-0"
                            >
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuItem
                              onClick={() => {
                                console.log("Edit clicked...", record);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault();
                                console.log("delete clicked...", record);
                              }}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    );
                  },
                },
              ] as ColumnDef<Machine>[]
            }
            data={machineData?.payload || []}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default page;
