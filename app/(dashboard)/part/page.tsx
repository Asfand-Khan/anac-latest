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
import { Machine } from "@/types/machineTypes";
import { Part, PartResponse } from "@/types/partTypes";
import { fetchParts } from "@/helperFunctions.ts/partHelperFunctions";

const page = () => {
  const router = useRouter();
  const { data: partData, isLoading: partLoading } =
    useQuery<PartResponse | null>({
      queryKey: ["part-list"],
      queryFn: fetchParts,
    });

  if (partLoading) {
    return <Loader />;
  }

  return (
    <>
      <SubNav
        title="Part"
        showDatePicker={false}
        showDataTableFilters={false}
      />
      <Card className="w-full shadow-none border-0">
        <CardHeader className="border-b py-4">
          <CardTitle className="tracking-tight text-lg font-semibold flex justify-between items-center">
            Explore your parts
            <div>
              <div>
                <Button
                  variant="primary"
                  className="text-left py-1"
                  onClick={() => router.push(`/part/add-part`)}
                >
                  Add Part
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
                  accessorKey: "part_kind",
                  header: "Part Kind",
                },
                {
                  accessorKey: "part_make",
                  header: "Part Make",
                },
                {
                  accessorKey: "part_type",
                  header: "Part Type",
                },
                {
                  accessorKey: "capacity_in_ltrs",
                  header: "Capacity in Ltrs",
                },
                {
                  accessorKey: "part_info",
                  header: "Part Info",
                },
                {
                  accessorKey: "analysis_type",
                  header: "Analysis Type",
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
              ] as ColumnDef<Part>[]
            }
            data={partData?.payload || []}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default page;