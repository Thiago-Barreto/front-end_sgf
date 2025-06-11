import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";
import type { authType } from "@/schema/auth";

const fetchSigIn = async (data: authType) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_KEY_PROD}/users/signin`,
      {
        UserID: data.UserID,
        AccessPassword: data.AccessPassword,
      },
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response.data.message);
  }
};

export function useSignIn() {
  const navigate = useNavigate();
  const mutate = useMutation({
    mutationFn: fetchSigIn,
    onSuccess: (result) => {
      const { user, token } = result;
      const client = JSON.stringify(user);
      Cookies.set("client", client);
      Cookies.set("token", token);
      navigate("/sgf/home");
    },
  });
  return mutate;
}

const logoutUser = async (id: number) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_KEY_PROD}/users/logout/${id}`,
    );
    toast.success(response.data.message);
    localStorage.clear();
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      toast.error(error.response.data.message);
      throw error;
    }
  }
};

export function useUserLogout() {
  const navigate = useNavigate();
  const mutate = useMutation({
    mutationFn: ({ id }: { id: number }) => logoutUser(id),
    onSuccess: () => {
      Cookies.remove("client");
      Cookies.remove("token");
      localStorage.clear();
      navigate("/");
    },
  });
  return mutate;
}
