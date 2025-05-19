import { SampleResponse } from "@/types/sampleTypes";
import axiosFunction from "@/utils/axiosFunction";

export const fetchSamples = async (): Promise<SampleResponse | null> => {
  try {
    const response = await axiosFunction({
      urlPath: "/samples",
    });
    return response;
  } catch (error: any) {
    console.error("Error fetching samples:", error.message);
    return null;
  }
};