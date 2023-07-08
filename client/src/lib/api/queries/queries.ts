export const getUser = async (privateAxiosInstance: any) => {
  const response = await privateAxiosInstance.get("/customer/profile");
  return response;
};
