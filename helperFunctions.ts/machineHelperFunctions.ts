import { MachineResponse } from "@/types/machineTypes";
import axiosFunction from "@/utils/axiosFunction";

export const fetchMachines = async (): Promise<MachineResponse | null> => {
  try {
    const response = await axiosFunction({
      urlPath: "/machines",
    });
    return response;
  } catch (error: any) {
    console.error("Error fetching machines:", error.message);
    return null;
  }
};