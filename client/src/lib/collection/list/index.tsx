import {
  Accordion
} from "@/components/ui/accordion";
import { useGetAreas, useGetRooms } from "@/hooks/queries";
import { Room } from "@/interfaces";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { RoomItem } from "./item";

export function RoomList() {
  const { areaId } = useParams()
  useGetAreas({})

  const { data,
  } = useGetRooms(
    areaId as string,
  )


  const rooms = useMemo(() => {
    return data ? data?.items : []
  }, [data])



  return (
    <>
      <Accordion type="single" collapsible className="flex flex-col gap-y-3">
        {rooms.map((room: Room.Detail) => <RoomItem room={room} key={room._id} />)}
      </Accordion>
    </>
  )
}
