import type { UserProfile } from "@/interface/user";
import Cookies from "js-cookie";

export const getUserLogin = (): UserProfile => {
  const storedData = Cookies.get("client");
  const parsedData: UserProfile = JSON.parse(storedData);
  return parsedData;
};
