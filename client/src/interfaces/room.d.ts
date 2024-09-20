import { Area } from "./area"

/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace Room {
    interface Detail {
        _id: string
        room_name: string
        area: Area.Detail
        rent_fee: number
        rentees: {
            _id: string
            rentee_name: string
        }[]

        is_selected: boolean
    }
}