import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";

const BASE_URL = `/collection`

export const createCollection = async (
  data: Api.CollectionApi.CreateCollectionPayload
): Promise<Api.CollectionApi.CreateCollectionResponse> => {
  return await AxiosInstance.post(BASE_URL, data);
};

export const getLatestCollection = async (
  room: string
): Promise<Api.CollectionApi.GetLatestCollectionResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/latest?room=${room}`);
};