"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SubNav from "@/components/ui/global/SubNav";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosFunction from "@/utils/axiosFunction";
import { useMutation } from "@tanstack/react-query";
import Papa from "papaparse";
import { useRef, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadMutation = useMutation({
    mutationFn: async (data: any[]) => {
      return axiosFunction({
        urlPath: "/sample-upload",
        data,
        method: "POST",
        isServer: true,
      });
    },
    onSuccess: () => {
      setError(null);
      if (fileRef.current) fileRef.current.value = "";
      toast.success("CSV data uploaded successfully");
    },
    onError: () => {
      toast.error("Failed to upload CSV data.");
    },
  });

  const handleUpload = () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return setError("Please select a file.");

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      return setError("Only CSV files are allowed.");
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const parsedData = results.data;
        console.log("Parsed CSV:", parsedData);
        uploadMutation.mutate(parsedData as any[]);
      },
      error: function (err) {
        setError("Failed to parse CSV: " + err.message);
      },
    });
  };

  return (
    <>
      <SubNav
        title="Uploads"
        showDatePicker={false}
        showDataTableFilters={false}
      />
      <Card className="w-full shadow-none border-0">
        <CardHeader className="border-b py-4">
          <CardTitle className="tracking-tight text-lg font-semibold flex justify-between items-center">
            Explore your uploads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-5">
            <div className="w-1/2 flex gap-2 items-center">
              <Label className="text-black font-semibold pr-2">Sample</Label>
              <Input
                type="file"
                accept=".csv"
                ref={fileRef}
                id="sample_report"
                className="w-full rounded-sm h-10"
              />
              <Button
                variant="primary"
                className="text-left py-5"
                onClick={handleUpload}
                disabled={uploadMutation.isPending}
              >
                {uploadMutation.isPending ? "Uploading..." : "Upload"}
              </Button>
            </div>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Page;
