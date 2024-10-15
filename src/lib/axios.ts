import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  timeout: 20000,
  headers: {
    Accept: "application/json",
  },
});

export async function Query<T>(
  url: string,
  config?: AxiosRequestConfig<any> | undefined
): Promise<T | boolean> {
  try {
    if (url === "/categories/get/logo192.png") return false;
    const res = await axiosInstance.get(`${url}`, {
      ...config,
      headers: { ...config?.headers, ...getAuthorizationHeader() },
    });
    if (res.status === 200) return res.data;

    return false;
  } catch (error) {
    console.log({ url , error });
    return false;
  }
}

export async function Post<T>(
  url: string,
  config?: AxiosRequestConfig<any> | undefined
): Promise<T | boolean> {
  const res = await axiosInstance.post(
    `${url}`,
    {
      ...config?.data,
    },
    { ...config, headers: { ...config?.headers, ...getAuthorizationHeader() } }
  );

  if (res.status === 200) return res.data;

  return false;
}

export function toFormData(data: { [key: string]: any }) {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
}

function getAuthorizationHeader() {
  if (typeof window === "undefined") return null;
  const userToken = getCookie("user_token");

  return { Authorization: userToken ? `Bearer ${userToken}` : undefined };
}
