import { BaseRepositoryInterface } from "@repositories/base/base.interface.repository";
import { Room } from "@modules/room/schemas/room.schema";

export interface RoomRepositoryInterface extends BaseRepositoryInterface<Room> { }