import type { ModelsResponse } from "@/interface/private/engineering/product/models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const fetchData = async () => {
  try {
    const response = await axios.get<ModelsResponse>(
      `${import.meta.env.VITE_API_KEY_PROD}/models/view`,
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

export function useModelsAll() {
  const query = useQuery({
    queryKey: ["models"],
    queryFn: fetchData,
    refetchInterval: 60 * 5 * 1000,
  });
  return { ...query, models: query.data?.models };
}
