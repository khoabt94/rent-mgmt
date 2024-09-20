import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Room } from "@/interfaces";
import { Pencil, Plus } from 'lucide-react';
import { CRUDRoomDrawer } from "../drawer/crud-room";
import { useOpenModal } from "@/hooks/utils/use-open-modal";
import { currencyFormatter } from "@/helpers/currency";
import { cn } from "@/utils/tailwind";
import { CreateCollectionDrawer } from "@/lib/collection/drawer/create-collection";

type RoomItemProps = {
  room: Room.Detail
}

export function RoomItem({ room }: RoomItemProps) {
  const { _id, room_name, area, rent_fee, rentees } = room
  const { open } = useOpenModal()
  const openCreateRoomDrawer = () => {
    open(CRUDRoomDrawer, {
      initialValue: room,
      area_id: area
    })
  }
  const openCreateCollectionDrawer = () => {
    open(CreateCollectionDrawer, {
      room,
    })
  }
  const isOccupied = rentees.length

  return (
    <AccordionItem value={_id} className={cn("rounded-lg shadow px-4  relative", isOccupied ? 'bg-green-100' : 'bg-red-100')}>
      <AccordionTrigger className="hover:no-underline gap-x-2 ">
        <div className="flex-1 flex items-center  justify-between">
          <p className="text-left w-[300px] truncate">
            {room_name}
          </p>
        </div>

      </AccordionTrigger>
      <AccordionContent className="relative h-[100px] flex gap-x-3">
        <div className="flex-1">
          <span className="block px-3 py-1 rounded-full bg-blue-200 text-blue-900 font-medium w-fit text-base">{currencyFormatter(rent_fee)}</span>
          {rentees.length ? (
            <div className="flex flex-wrap gap-x-2 gap-y-2 mt-2">
              {rentees.map(rentee => (
                <span className="block px-3 py-1 rounded-full bg-gray-200 text-gray-900 font-medium w-fit text-xs">{rentee.rentee_name}</span>
              ))}
            </div>
          ) : <></>}

        </div>
        <div className="flex flex-col justify-end gap-y-2">
          <Button type="button" variant={'ghost'} className="pr-0" onClick={openCreateCollectionDrawer}>
            <Plus strokeWidth={1.5} />
          </Button>
          <Button type="button" variant={'ghost'} className="pr-0" onClick={openCreateRoomDrawer}>
            <Pencil strokeWidth={1.5} />
          </Button>

        </div>

      </AccordionContent>
    </AccordionItem>
  )
}
