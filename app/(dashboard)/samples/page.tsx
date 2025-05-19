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
import { Edit, File, MoreHorizontal, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sample, SampleResponse } from "@/types/sampleTypes";
import { fetchSamples } from "@/helperFunctions.ts/sampleHelperFunctions";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";

const page = () => {
  const router = useRouter();
  const { data: sampleData, isLoading: sampleLoading } =
    useQuery<SampleResponse | null>({
      queryKey: ["sample-list"],
      queryFn: fetchSamples,
    });

  const handleDownload = async () => {
    try {
      const response = await fetch("/reports/sampleLabReport.pdf");
      if (!response.ok) {
        throw new Error("File not found");
      }
      toast.success("Download started!");
      const formattedDate = format(new Date(), "yyyy-MM-dd"); // e.g., "2025-05-19"
      const a = document.createElement("a");
      a.href = "/reports/sampleLabReport.pdf";
      a.download = `sampleLabReport_${formattedDate}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      toast.error("Failed to download the report. File may be missing.");
      console.error("Download error:", error);
    }
  };

  if (sampleLoading) {
    return <Loader />;
  }

  return (
    <>
      <SubNav
        title="Sample"
        showDatePicker={false}
        showDataTableFilters={false}
      />
      <Card className="w-full shadow-none border-0">
        <CardHeader className="border-b py-4">
          <CardTitle className="tracking-tight text-lg font-semibold flex justify-between items-center">
            Explore your samples
            <div>
              <div>
                <Button
                  variant="primary"
                  className="text-left py-1"
                  onClick={() => router.push(`/samples/add-sample`)}
                >
                  Add Sample
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
                  accessorKey: "barcode_no",
                  header: "Barcode No",
                },
                {
                  accessorKey: "fluid_name",
                  header: "Fluid Name",
                },
                {
                  accessorKey: "fluid_time",
                  header: "Fluid Time",
                },
                {
                  accessorKey: "sample_date",
                  header: "Sample Date",
                },
                {
                  accessorKey: "total_mileage",
                  header: "Total Mileage",
                },
                {
                  accessorKey: "mileage_unit",
                  header: "Mileage Unit",
                },
                {
                  accessorKey: "intermediate_sample",
                  header: "Status",
                  accessorFn: (row) =>
                    row.intermediate_sample === true ? "Yes" : "No",
                  cell: ({ row }) => {
                    const status = row.getValue(
                      "intermediate_sample"
                    ) as string;
                    return (
                      <Badge
                        className={`justify-center py-1 min-w-[50px] w-[70px]`}
                        variant={status === "Yes" ? "success" : "danger"}
                      >
                        {status === "Yes" ? "Yes" : "No"}
                      </Badge>
                    );
                  },
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

                            <DropdownMenuItem onClick={handleDownload}>
                              <File className="mr-2 h-4 w-4" />
                              Download Report
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    );
                  },
                },
              ] as ColumnDef<Sample>[]
            }
            data={sampleData?.payload || []}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default page;
