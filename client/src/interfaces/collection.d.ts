import { CollectionStatuses } from "@/constants/collection";
import { Room } from "./room";

/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace Collection {
    interface Detail {
        _id: string
        collection_name: string;
        owner: string
        status: CollectionStatuses
        amount_collect: number;
        room: Room.Detail;
        rent_fee: number;
        electricity_unit_price: number;
        water_unit_price: number;
        begin_electricity: number;
        end_electricity: number;
        begin_water: number;
        end_water: number;
        other_fee: number;
        deduction: number;
        amount_due: number;
    }
}