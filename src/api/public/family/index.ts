import type { FamilyResponse } from "@/interface/public/family";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const fetchData = async () => {
  try {
    const response = await axios.get<FamilyResponse>(
      `${import.meta.env.VITE_API_KEY_PROD}/family/view`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        window.location.href = "/";
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error(error.response?.data.message);
      }
    }
  }
};

export function useFamilyAll() {
  const query = useQuery({
    queryKey: ["family"],
    queryFn: fetchData,
    refetchInterval: 60 * 5 * 1000,
  });
  return { ...query, family: query.data?.family };
}
