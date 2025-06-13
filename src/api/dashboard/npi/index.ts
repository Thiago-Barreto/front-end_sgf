import type { DashboardNpiResponse } from "@/interface/dashboard/npi";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const fetchData = async (month: number) => {
  console.log(month);
  try {
    const response = await axios.get<DashboardNpiResponse>(
      `${import.meta.env.VITE_API_KEY_PROD}/dashboard/npi`,
      {
        params: { month },
      },
    );
    return response.data;
  } catch (error) {
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

export function useDashboardNpi(month: number) {
  const query = useQuery({
    queryKey: ["dashboard_data", month],
    queryFn: () => fetchData(month),
    refetchInterval: 60 * 5 * 1000,
    enabled: !!month,
    placeholderData: keepPreviousData,
  });
  return {
    ...query,
    data: query.data?.programming,
    npi: query.data?.resultMonth,
    monthlyCount: query.data?.monthlyCount,
    distinctFamilies: query.data?.distinctFamilies,
    performance: query.data?.performance,
  };
}
