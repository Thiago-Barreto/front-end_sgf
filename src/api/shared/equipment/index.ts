import type { EquipmentResponse } from "@/interface/shared/equipments";
import type { ReturnEquipmentsData } from "@/interface/shared/equipments/movements";
import type {
  EquipmentCreateType,
  EquipmentUpdateType,
  MovementsType,
} from "@/schema/shared/equipments";
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

const createEquipment = async (data: EquipmentCreateType) => {
  const user = getUserLogin();
  try {
    const response = await axios.post<EquipmentResponse>(
      `${import.meta.env.VITE_API_KEY_PROD}/equipments/create`,
      {
        ...data,
        UserCad: user.UserID,
      },
      {
        params: {
          sector: user.sector,
          locality: user.locality,
          factory: user.factory,
        },
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

const updateModel = async (data: EquipmentUpdateType) => {
  const user = getUserLogin();
  try {
    const response = await axios.put<EquipmentResponse>(
      `${import.meta.env.VITE_API_KEY_PROD}/equipments/update/${data.id}`,
      {
        ...data,
        UserUpdate: user.UserID,
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

export function useEquipmentUpdate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: ({ data }: { data: EquipmentUpdateType }) => updateModel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipments"] });
    },
  });
  return mutate;
}

const movementExitEquipment = async (data: MovementsType) => {
  const user = getUserLogin();
  try {
    const response = await axios.post<EquipmentResponse>(
      `${import.meta.env.VITE_API_KEY_PROD}/equipments/create/movement/exit`,
      {
        ...data,
        user_exit: user.UserID,
        sector: user.sector,
      },
    );
    const result = Number(response.data.result);

    if (result !== 200 && result !== 201) {
      toast.error(response.data.title, {
        description: response.data.message,
      });
      console.log(response.data);
      throw new Error(response.data);
    } else {
      toast.success(response.data.title, {
        description: response.data.message,
      });
    }
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.data) {
      toast.error(error.response.data.title, {
        description: error.response.data.message,
      });
    }
  }
};

export function useMovementExitEquipment() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: movementExitEquipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipments"] });
    },
  });
  return mutate;
}

const activeEquipments = async () => {
  const user = getUserLogin();
  try {
    const response = await axios.get<ReturnEquipmentsData>(
      `${import.meta.env.VITE_API_KEY_PROD}/equipments/view/movements`,
      {
        params: {
          sector: user.sector,
        },
      },
    );
    console.log(response.data);
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

export function useActiveEquipments() {
  const query = useQuery({
    queryKey: ["equipments"],
    queryFn: activeEquipments,
    refetchInterval: 60 * 5 * 1000,
  });
  return { ...query, actives: query.data?.actives };
}
