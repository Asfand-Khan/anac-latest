import { SampleReportResponse } from "@/types/sampleReport";
import axiosFunction from "@/utils/axiosFunction";

export const fetchSampleReport = async (id: string): Promise<SampleReportResponse | null> => {
  try {
    const response = await axiosFunction({
      urlPath: "/parts/report",
      method: "POST",
      data:{
        id: String(id)
      }
    });
    return response;
  } catch (error: any) {
    console.error("Error fetching sample part report:", error.message);
    return null;
  }
};