import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";

const BASE_URL = `/room`

export const getRooms = async (
  area_id: string,
): Promise<Api.RoomApi.GetRoomsResponse> => {
  return await AxiosInstance.get(`${BASE_URL}?area=${area_id}`);
};

export const getRoom = async (
  room: string,
): Promise<Api.RoomApi.GetRoomResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/${room}`);
};

export const createRoom = async (
  data: Api.RoomApi.CreateRoomPayload
): Promise<Api.RoomApi.CreateRoomResponse> => {
  return await AxiosInstance.post(BASE_URL, data);
};

export const updateRoom = async (
  { room_id, ...data }: Api.RoomApi.UpdateRoomPayload
): Promise<Api.RoomApi.UpdateRoomResponse> => {
  return await AxiosInstance.patch(`${BASE_URL}/${room_id}`, data);
};