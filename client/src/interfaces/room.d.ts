
/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace Room {
    interface Detail {
        _id: string
        room_name: string
        area: string
        rent_fee: number
        rentees: {
            _id: string
            rentee_name: string
        }[]
    }
}