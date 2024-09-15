import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";

const BASE_URL = `/rentee`

export const getRentees = async (
): Promise<Api.RenteeApi.GetRenteesResponse> => {
  return await AxiosInstance.get(BASE_URL);
};

export const createRentee = async (
  data: Api.RenteeApi.CreateRenteePayload
): Promise<Api.RenteeApi.CreateRenteeResponse> => {
  return await AxiosInstance.post(BASE_URL, data);
};

export const updateRentee = async (
  { id, ...data }: Api.RenteeApi.UpdateRenteePayload
): Promise<Api.RenteeApi.UpdateRenteeResponse> => {
  return await AxiosInstance.patch(`${BASE_URL}/${id}`, data);
};