import useSWR, { type SWRConfiguration } from "swr";
import { fetcher } from "@/lib/fetcher";
import type { User } from "./type";

export const useUserById = (
  userId: string,
  ms?: string,
  swrConfig?: SWRConfiguration,
) => {
  return useSWR<User>(`/api/users/${userId}?ms=${ms}`, fetcher, swrConfig);
};
