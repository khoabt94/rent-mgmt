import { Room } from "./room"

/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace Rentee {
    interface Detail {
        _id: string
        rentee_name: string
        rentee_id: string
        owner: string
        room?: Room.Detail
        area?: string
        image_url: string
        address: string,
        dob: string,
    }
}