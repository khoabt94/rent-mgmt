import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/helpers/currency";
import { useOpenModal } from "@/hooks/utils/use-open-modal";
import { Collection } from "@/interfaces";
import { cn } from "@/utils/tailwind";
import { Pencil } from 'lucide-react';
import { genCollectionInfo } from "../helpers";
import { UpdateCollectionDrawer } from "../drawer/update-collection";

type CollectionItemProps = {
  collection: Collection.Detail
}

export function CollectionItem({ collection }: CollectionItemProps) {
  const {
    _id,
    amount_due,
    room,
    rent_fee,
    other_fee,
    deduction,
    water_unit_price,
    electricity_unit_price,
    end_electricity,
    begin_electricity,
    end_water,
    begin_water,
    amount_collect
  } = collection
  const { open } = useOpenModal()
  const openCreateRoomDrawer = () => {
    open(UpdateCollectionDrawer, {
      initialValue: collection,
    })
  }
  const isPaid = amount_due <= amount_collect
  const {
    amountDue,
    amountElectricity,
    amountWater,
  } = genCollectionInfo({
    end_electricity,
    begin_electricity,
    end_water,
    begin_water,
    electricity_unit_price,
    water_unit_price,
    rent_fee,
    other_fee,
    deduction
  })

  return (
    <AccordionItem value={_id} className={cn("rounded-lg shadow px-4  relative", isPaid ? 'bg-green-100' : 'bg-red-100')}>
      <AccordionTrigger className="hover:no-underline gap-x-4 ">
        <div className=" flex items-center flex-1 justify-between">
          <p className="text-left w-[200px] truncate">
            {room.room_name}
          </p>
          <p className="text-right shrink-0 grow-0 w-fit">
            {currencyFormatter(amount_due)}
          </p>
        </div>

      </AccordionTrigger>
      <AccordionContent className="relative h-[100px] flex gap-x-3">
        <div className="flex-1 text-gray-800">
          <p className="block">Tiền phòng:
            {" "}
            <span className="font-medium">
              {currencyFormatter(rent_fee)}
            </span>
          </p>
          <p className="block">Tiền điện:
            {" "}
            <span className="font-medium">
              {currencyFormatter(amountElectricity)}
            </span>
          </p>
          <p className="block">Tiền nước:
            {" "}
            <span className="font-medium">
              {currencyFormatter(amountWater)}
            </span>
          </p>
          <p className="block font-bold">Tổng tiền:
            {" "}
            <span className="font-bold">
              {currencyFormatter(amountDue)}
            </span>
          </p>
        </div>
        <div className="flex flex-col justify-end gap-y-2">
          <Button type="button" variant={'ghost'} className="pr-0" onClick={openCreateRoomDrawer}>
            <Pencil strokeWidth={1.5} />
          </Button>
        </div>

      </AccordionContent>
    </AccordionItem >
  )
}
