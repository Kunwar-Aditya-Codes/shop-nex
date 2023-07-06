export const getUser = (privateAxiosInstance: any) => {
  const getUserProfile = async () => {
    const response = await privateAxiosInstance.get('/customer/profile');
    console.log(response);
  };
  return getUserProfile;
};
