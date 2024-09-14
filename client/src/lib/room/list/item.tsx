import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Room } from "@/interfaces";
import { Pencil } from 'lucide-react';
import { CRUDRoomDrawer } from "../drawer/crud-room";
import { useOpenModal } from "@/hooks/utils/use-open-modal";

type RoomItemProps = {
  room: Room.Detail
}

export function RoomItem({ room }: RoomItemProps) {
  const { _id, room_name, area } = room
  const { open } = useOpenModal()
  const openCreateRoomDrawer = () => {
    open(CRUDRoomDrawer, {
      initialValue: room,
      area_id: area
    })
  }

  return (
    <AccordionItem value={_id} className="rounded-lg shadow px-4 bg-white relative">
      <AccordionTrigger className="hover:no-underline gap-x-2 ">
        <div className="flex-1 flex items-center  justify-between">
          <p className="text-left w-[300px] truncate">
            {room_name}
          </p>
        </div>

      </AccordionTrigger>
      <AccordionContent>
        <div className="flex gap-x-4 mt-3 justify-end h-8 items-center w-full">
          <Button type="button" variant={'ghost'} className="p-0 h-full" onClick={openCreateRoomDrawer}>
            <Pencil strokeWidth={1.5} />
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
