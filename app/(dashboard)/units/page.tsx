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
import { Unit, UnitResponse } from "@/types/unitTypes";
import { fetchUnits } from "@/helperFunctions.ts/unitHelperFunctions";

const Page = () => {
  const router = useRouter();
  const { data: unitsData, isLoading: unitsLoading } =
    useQuery<UnitResponse | null>({
      queryKey: ["unit-list"],
      queryFn: fetchUnits,
    });

  if (unitsLoading) {
    return <Loader />;
  }
  return (
    <>
      <SubNav
        title="Units"
        showDatePicker={false}
        showDataTableFilters={false}
      />
      <Card className="w-full shadow-none border-0">
        <CardHeader className="border-b py-4">
          <CardTitle className="tracking-tight text-lg font-semibold flex justify-between items-center">
            Explore your units
            <div>
              <div>
                <Button
                  variant="primary"
                  className="text-left py-1"
                  onClick={() => router.push(`/units/add-unit`)}
                >
                  Add Unit
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
                  accessorKey: "unit_name",
                  header: "Unit Name",
                },
                {
                  accessorKey: "unit_code",
                  header: "Unit Code",
                },
                {
                  accessorKey: "unit_contact",
                  header: "Contact",
                },
                {
                  accessorKey: "unit_address",
                  header: "Address",
                },
                {
                  accessorKey: "unit_contact_person",
                  header: "Contact Person",
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
              ] as ColumnDef<Unit>[]
            }
            data={unitsData?.payload || []}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Page;
