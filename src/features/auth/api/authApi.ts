import axiosInstance from "../../../core/api/apiIntercept";

export const registerUser = async (data: {
  username: string;
  password: string;
}) => {
  const response = await axiosInstance.post(
    "/user/register",
    data
  );
  return response.data;
};

export const loginUser = async (data: {
  username: string;
  password: string;
}) => {
  const response = await axiosInstance.post(
    "/user/login",
    data
  );
  return response.data;
};