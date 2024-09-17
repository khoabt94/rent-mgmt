import { Room } from "./room"

/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace Area {
    interface Detail {
        _id: string
        area_name: string
        electricity_unit_price: number
        water_unit_price: number
        room: Room.Detail[]
    }
}