import { CollectionItemStatuses, CollectionStatuses } from "@/constants/collection";

/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace Collection {
    interface Item {
        room: string;
        area: string;
        status: CollectionItemStatuses;
        rent_fee: number;
        electricity_unit_price: number;
        water_unit_price: number;
        begin_electricity: number;
        end_electricity: number;
        begin_water: number;
        end_water: number;
        other_fee: number;
        amount_due: number;
        deduction: number;
        total_amount_due: number;
        _id: string;
    }

    interface Detail {
        _id: string;
        collection_name: string;
        owner: string;
        status: CollectionStatuses;
        total_amount_collect: number;
        collection_items: Item[];
        created_at: string;
        updated_at: string;
    }
}