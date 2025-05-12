import { UnitResponse } from "@/types/unitTypes";
import axiosFunction from "@/utils/axiosFunction";

export const fetchUnits = async (): Promise<UnitResponse | null> => {
  try {
    const response = await axiosFunction({
      urlPath: "/units",
    });
    return response;
  } catch (error: any) {
    console.error("Error fetching units:", error.message);
    return null;
  }
};