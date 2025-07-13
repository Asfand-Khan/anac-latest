"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/global/Loader";
import SubNav from "@/components/ui/global/SubNav";
import { fetchSampleReport } from "@/helperFunctions.ts/sampleReportHelperFunctions";
import { SampleReport, SampleReportResponse } from "@/types/sampleReport";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const page = () => {
  const params = useParams();
  const slug = params.slug as string;

  const { data: sampleReportData, isLoading: sampleReportLoading } =
    useQuery<SampleReportResponse | null>({
      queryKey: ["part-sample-report", slug],
      queryFn: () => fetchSampleReport(slug),
      enabled: !!slug,
    });

  if (sampleReportLoading) {
    return <Loader />;
  }

  const elements = [
    "Fe",
    "Pb",
    "Cu",
    "Sn",
    "Cr",
    "Al",
    "Ni",
    "Si",
    "H2O",
    "Flash",
    "Soot%",
    "B",
    "Na",
    "V",
    "Li",
    "Ca",
    "Ba",
    "Zn",
    "P",
    "Mg",
    "Mo",
    "K",
    "TBN",
    "TAN",
    "V40",
    "V100",
    "PaCo ISO",
    "PaCo NAS",
    "OxP",
    "NIP",
    "IpH",
    "Appearance",
    "Acid Index",
    "Ag"
  ];
  return (
    <>
      <SubNav
        title="Report"
        showDatePicker={false}
        showDataTableFilters={false}
      />
      <Card className="w-full shadow-none border-0">
        <CardHeader className="border-b py-4">
          <CardTitle className="tracking-tight text-lg font-semibold flex justify-between items-center">
            Below is your part report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Sample code</TableHead>
                {sampleReportData?.payload.map((report) => (
                  <TableHead key={report.id}>{report.label}</TableHead>
                ))}
              </TableRow>
              <TableRow>
                <TableHead>Sample Date</TableHead>
                {sampleReportData?.payload.map((report) => (
                  <TableHead key={report.id}>{report.created_at.split("T")[0]}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
                {elements.map((element) => (
                <TableRow key={element}>
                  <TableHead className="w-[100px]">{element}</TableHead>
                  {sampleReportData?.payload.map((report) => (
                    <TableCell key={`${report.id}-${element}`}>
                      {report[element.toLowerCase() as keyof SampleReport] || ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default page;
