import type { NpiResponse } from "@/interface/private/engineering/product/npi";
import type { NewProgrammingNpiType } from "@/schema/private/engineering/product/npi";
import { getUserLogin } from "@/utils/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const fetchData = async () => {
  try {
    const response = await axios.get<NpiResponse>(
      `${import.meta.env.VITE_API_KEY_PROD}/npi/view`,
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

export function useNpiAll() {
  const query = useQuery({
    queryKey: ["npi"],
    queryFn: fetchData,
    refetchInterval: 60 * 5 * 1000,
  });
  return { ...query, npi: query.data?.npi };
}

const newModel = async (data: NewProgrammingNpiType) => {
  const user = getUserLogin();
  try {
    const response = await axios.post<NpiResponse>(
      `${import.meta.env.VITE_API_KEY_PROD}/models/create`,
      {
        ...data,
        createUser: user.UserID,
      },
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response.data.title, {
      description: error?.response.data.message,
    });
  }
};

export function useNewProgrammingNpi() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: newModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["npi"] });
    },
  });
  return mutate;
}
