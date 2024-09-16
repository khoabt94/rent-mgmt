import { Area } from "./area"
import { Rentee } from "./rentee"
import { Room } from "./room"
import { User } from "./user"

/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace Api {
  interface BaseGetAllResponse<T> {
    items: T[]
    total: number
  }


  namespace UserApi {

    interface UpdateUserInfoPayload {
      name?: string
      avatar?: string
    }

    interface ChangePasswordPayload {
      old_password: string,
      new_password: string,
    }
    interface GetUserInfoResponse {
      user: User.Detail,
      access_token: string
    }

    interface ChangePasswordResponse {
      access_token: string
    }
  }

  namespace AuthApi {

    interface LoginPayload {
      email: string
      password: string
    }

    interface CreateResetPasswordPayload {
      email: string
    }

    interface ResetPasswordPayload {
      password: string
    }

    interface CreateResetPasswordResponse {
    }

    interface ResetPasswordResponse {
    }

    interface SignUpPayload {
      username: string
      email: string
      password: string
    }

    interface LoginResponse extends User.Detail {
      access_token: string
    }

    interface RefereshTokenResponse {
      access_token: string
    }


    interface SignupResponse {
      user: User.Detail,
      access_token: string
    }


  }

  namespace AreaApi {
    interface CreateAreaPayload {
      area_name: string
    }

    interface GetAreasResponse extends BaseGetAllResponse<Area.Detail> {
    }

    interface GetAreaResponse extends Area.Detail {

    }

    interface GetAreaQuery {
      area_id: string
    }

    interface CreateAreaResponse extends Area.Detail {

    }

    interface UpdateAreaPayload extends CreateAreaPayload {
      area_id: string
    }

    interface UpdateAreaResponse {

    }
  }

  namespace RoomApi {
    interface CreateRoomPayload {
      room_name: string
      area: string
      rent_fee: number
    }

    interface GetRoomsResponse extends BaseGetAllResponse<Room.Detail> {
    }

    interface GetRoomResponse extends Room.Detail {

    }

    interface GetRoomQuery {
      area_id: string
    }

    interface CreateRoomResponse {

    }

    interface UpdateRoomPayload extends CreateRoomPayload {
      room_id: string
    }

    interface UpdateRoomResponse {

    }
  }

  namespace RenteeApi {
    interface CreateRenteePayload {
      rentee_id: string;
      rentee_name: string;
      room?: string;
      image_url: string
      address: string
      dob: string
    }

    interface GetRenteesResponse extends BaseGetAllResponse<Rentee.Detail> {
    }

    interface GetRenteeResponse extends Rentee.Detail {

    }

    interface GetRenteeQuery {
    }

    interface CreateRenteeResponse {

    }

    interface UpdateRenteePayload extends CreateRenteePayload {
      id: string
    }

    interface UpdateRenteeResponse {

    }
  }

}