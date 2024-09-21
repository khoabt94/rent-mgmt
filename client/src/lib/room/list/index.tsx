import {
  Accordion
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetRooms } from "@/hooks/queries";
import { Room } from "@/interfaces";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { CRUDRoomDrawer } from "../drawer/crud-room";
import { RoomItem } from "./item";

export function RoomList() {
  const { areaId } = useParams()
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  const openCreateRoomDrawer = () => {
    setIsOpenDrawer(true)
  }
  const { data,
  } = useGetRooms(
    areaId as string,
  )


  const rooms = useMemo(() => {
    return data ? data?.items : []
  }, [data])


  return (
    <>
      <Button
        type="button"
        variant={'outline'}
        className="flex items-center justify-center rounded-full size-10 fixed right-5 bottom-5 bg-gray-900 z-50 !p-0"
        onClick={openCreateRoomDrawer}
      >
        <Plus color="#ffffff" size={20} strokeWidth={4} />
      </Button>
      <ScrollArea className="h-[calc(100dvh-320px)] gap-y-4 no-scrollbar">
        <Accordion type="multiple" className="flex flex-col gap-y-3">
          {rooms.map((room: Room.Detail) => <RoomItem room={room} key={room._id} />)}
        </Accordion>
      </ScrollArea>
      <CRUDRoomDrawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer} area_id={areaId as string} />
    </>
  )
}
