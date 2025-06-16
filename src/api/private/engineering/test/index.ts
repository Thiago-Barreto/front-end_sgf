import type { EquipmentResponse } from "@/interface/private/engineering/test";
import type { EquipmentType } from "@/schema/private/engineering/test/equipments";
import { getUserLogin } from "@/utils/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const fetchData = async () => {
  const user = getUserLogin();
  try {
    const response = await axios.get<EquipmentResponse>(
      `${import.meta.env.VITE_API_KEY_PROD}/equipments/view`,
      {
        params: {
          sector: user.sector,
        },
      },
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

export function useEquipmentsAll() {
  const query = useQuery({
    queryKey: ["equipments"],
    queryFn: fetchData,
    refetchInterval: 60 * 5 * 1000,
  });
  return { ...query, equipments: query.data?.equipments };
}

const createEquipment = async (data: EquipmentType) => {
  const user = getUserLogin();
  try {
    const response = await axios.post<EquipmentResponse>(
      `${import.meta.env.VITE_API_KEY_PROD}/equipments/create`,
      {
        ...data,
        createUser: user.UserID,
      },
      {
        params: {
          sector: user.sector,
          locality: user.locality,
          factory: user.factory,
        },
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

export function useCreateEquipment() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: createEquipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipments"] });
    },
  });
  return mutate;
}
