import type { UserResponse } from "@/interface/user";
import { getUserLogin } from "@/utils/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import type { UpdateProfileSchemaType } from "@/schema/user/update/profile";
import { getToken } from "@/utils/token";

const fetchData = async () => {
  try {
    const response = await axios.get<UserResponse>(
      `${import.meta.env.VITE_API_KEY_PROD}/users/view`,
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

export function useUsersAll() {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: fetchData,
    refetchInterval: 60 * 5 * 1000,
  });
  return { ...query, users: query.data?.users };
}

const updateProfile = async (
  data: UpdateProfileSchemaType,
): Promise<UserResponse | undefined> => {
  console.log("Updating profile with data:", data);
  const token = getToken();
  const user = getUserLogin();
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_KEY_PROD}/users/update/profile/${user?.UserID}`,
      {
        ...data,
        userUpdate: user?.UserID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-User-Sector": user?.sector,
        },
      },
    );
    toast.success(response.data.title, {
      description: response.data.message,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        window.location.href = "/";
        toast.error(error.response.data.message);
      } else if (error) {
        toast.error(error.response?.data.title, {
          description: error.response?.data.message,
        });
      }
    }
  }
};

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutate = useMutation({
    mutationFn: ({ data }: { data: UpdateProfileSchemaType }) =>
      updateProfile(data),
    onSuccess: () => {
      Cookies.remove("client");
      Cookies.remove("token");
      localStorage.clear();
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  return mutate;
}
