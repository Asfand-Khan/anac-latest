import axios, { AxiosRequestConfig, ResponseType } from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { toast } from "sonner";

type MethodType = "POST" | "GET" | "PUT" | "DELETE";
type axiosParams = {
  method?: MethodType;
  urlPath: string;
  data?: any;
  params?: any;
  token?: string;
  secretKey?: string;
  responseType?: ResponseType;
  isServer?: boolean;
};
export type axiosReturnType = {
  status: number;
  message: string;
  payload: any;
};

export default async function axiosFunction({
  urlPath = "",
  method = "GET",
  data = {},
  params = {},
  token = undefined,
  responseType = undefined,
  isServer = false,
}: axiosParams): Promise<axiosReturnType> {
  const url = process.env.NEXT_PUBLIC_SERVER_URL + urlPath;

  const cookieToken = getCookie("anac-token")?.toString() || null;

  const authToken = token || cookieToken;

  const config: AxiosRequestConfig = {
    method: method,
    url: url,
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : ""
    },
    data: data,
  };

  if (responseType) {
    config["responseType"] = responseType;
  }

  if (method === "GET") {
    config["params"] = params;
  }

  try {
    const result: any = await axios(config);

    if (result.status === 401) {
      toast.error("Your session has expired. Please login again.");
      deleteCookie("anac-token");
    }

    return result.data;
  } catch (err: any) {
  
    if(isServer === false) {
      return {
        payload: [],
        message: err.message,
        status: 500,
      };
    }

    throw err;
  }
}
