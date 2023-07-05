import { useBoundStore } from "../app/store";
import { axiosInstance } from "../lib/api/axiosConfig";

const useRefreshToken = () => {
  const setToken = useBoundStore((state) => state.setToken);
  
  const refreshToken = async () => {
    const response = await axiosInstance.get("/auth/refresh_token");
    const accessToken = response.data?.accessToken as string;

    setToken(accessToken);

    return accessToken;
  };

  return refreshToken;
};

export default useRefreshToken;
