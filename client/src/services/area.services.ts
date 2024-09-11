import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";

const BASE_URL = '/area'

export const getAreas = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<Api.AreaApi.GetAreasResponse> => {
  return await AxiosInstance.get(BASE_URL);
};


export const getArea = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  area_id: number
): Promise<Api.AreaApi.GetAreaResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/${area_id}`);
};

export const createArea = async (
  data: Api.AreaApi.CreateAreaPayload
): Promise<Api.AreaApi.CreateAreaResponse> => {
  return await AxiosInstance.post(BASE_URL, data);
};

export const updateArea = async (
  { area_id, ...data }: Api.AreaApi.UpdateAreaPayload
): Promise<Api.AreaApi.UpdateAreaResponse> => {
  return await AxiosInstance.patch(`${BASE_URL}/${area_id}`, data);
};

export const deleteArea = async (
  area_id: string
): Promise<null> => {
  return await AxiosInstance.delete(`${BASE_URL}/${area_id}`);
};