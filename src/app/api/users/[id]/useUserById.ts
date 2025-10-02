import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import type { User } from "./type";

export const useUserById = (userId: string, ms?: string) => {
  return useSWR<User>(`/api/users/${userId}?ms=${ms}`, fetcher);
};
