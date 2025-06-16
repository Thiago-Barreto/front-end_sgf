import type { ModelsResponse } from "@/interface/private/engineering/product/models";
import {
  type ModelsCreate,
  type ModelsTypeUpdate,
} from "@/schema/private/engineering/product/models";
import { getUserLogin } from "@/utils/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

const newModel = async (data: ModelsCreate) => {
  const user = getUserLogin();
  try {
    const response = await axios.post<ModelsResponse>(
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

export function useNewModel() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: newModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models", "family"] });
    },
  });
  return mutate;
}

const updateModel = async (data: ModelsTypeUpdate) => {
  const user = getUserLogin();
  try {
    const response = await axios.put<ModelsResponse>(
      `${import.meta.env.VITE_API_KEY_PROD}/models/update/${data.ID}`,
      {
        ...data,
        updateUser: user.UserID,
      },
    );
    toast.success(response.data.title, {
      description: response.data.message,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response.data.title, {
      description: error?.response.data.message,
    });
  }
};

export function useModelUpdate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: ({ data }: { data: ModelsTypeUpdate }) => updateModel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models", ["family"]] });
    },
  });
  return mutate;
}
