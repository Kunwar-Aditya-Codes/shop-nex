import { useCallback, useEffect } from 'react';
import { useBoundStore } from '../app/store';
import { privateAxiosInstance } from '../lib/api/axiosConfig';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {
  const token = useBoundStore((state) => state.token);
  const refresh = useRefreshToken();

  const requestInterceptor = useCallback(
    (config: any) => {
      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    [token]
  );

  const responseInterceptor = useCallback(
    async (error: any) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newAccessToken = await refresh();
        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return privateAxiosInstance(prevRequest);
      }
      return Promise.reject(error);
    },
    [refresh]
  );

  useEffect(() => {
    const requestInterceptorId =
      privateAxiosInstance.interceptors.request.use(requestInterceptor);
    const responseInterceptorId =
      privateAxiosInstance.interceptors.response.use(
        undefined,
        responseInterceptor
      );
    return () => {
      privateAxiosInstance.interceptors.request.eject(requestInterceptorId);
      privateAxiosInstance.interceptors.response.eject(responseInterceptorId);
    };
  }, [requestInterceptor, responseInterceptor]);

  return privateAxiosInstance;
};

export default useAxiosPrivate;
