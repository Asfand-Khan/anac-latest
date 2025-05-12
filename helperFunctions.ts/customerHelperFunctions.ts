import { CustomerResponse } from "@/types/customerTypes";
import axiosFunction from "@/utils/axiosFunction";

export const fetchCustomers = async (): Promise<CustomerResponse | null> => {
  try {
    const response = await axiosFunction({
      urlPath: "/customers",
    });
    return response;
  } catch (error: any) {
    console.error("Error fetching customers:", error.message);
    return null;
  }
};