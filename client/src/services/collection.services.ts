import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";
import queryString from 'query-string';

const BASE_URL = `/collection`

export const createCollection = async (
  data: Api.CollectionApi.CreateCollectionPayload
): Promise<Api.CollectionApi.CreateCollectionResponse> => {
  return await AxiosInstance.post(BASE_URL, data);
};

export const updateCollection = async (
  { id, ...data }: Api.CollectionApi.UpdateCollectionPayload
): Promise<Api.CollectionApi.UpdateCollectionResponse> => {
  return await AxiosInstance.patch(`${BASE_URL}/${id}`, data);
};

export const getCollections = async (
  query: Api.CollectionApi.GetCollectionsQuery
): Promise<Api.CollectionApi.GetCollectionsResponse> => {
  console.log("🚀 ~ query:", query)
  return await AxiosInstance.get(`${BASE_URL}?${queryString.stringify(query)}`);
};

export const getLatestCollection = async (
  room: string
): Promise<Api.CollectionApi.GetLatestCollectionResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/latest?room=${room}`);
};