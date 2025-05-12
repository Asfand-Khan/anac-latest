import { PartResponse } from "@/types/partTypes";
import axiosFunction from "@/utils/axiosFunction";

export const fetchParts = async (): Promise<PartResponse | null> => {
  try {
    const response = await axiosFunction({
      urlPath: "/parts",
    });
    return response;
  } catch (error: any) {
    console.error("Error fetching parts:", error.message);
    return null;
  }
};