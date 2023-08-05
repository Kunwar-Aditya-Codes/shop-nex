import { useBoundStore } from '../app/store';
import { axiosInstance } from '../lib/api/axiosConfig';

const useRefreshToken = () => {
  const setToken = useBoundStore((state) => state.setToken);
  const setUser = useBoundStore((state) => state.setUser);

  const refreshToken = async () => {
    const response = await axiosInstance.get('/auth/refresh_token');


    const accessToken = response.data?.accessToken as string;

    setToken(accessToken);

    if (accessToken) {
      const userData = await axiosInstance.get('/customer/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUser(userData.data.customer);
    }

    return accessToken;
  };

  return refreshToken;
};

export default useRefreshToken;
