import { Button } from "@/components/ui/button"
import { useGetArea } from "@/hooks/queries"
import { useOpenModal } from "@/hooks/utils/use-open-modal"
import { CRUDRoomDrawer } from "@/lib/room/drawer/crud-room"
import { RoomList } from "@/lib/room/list"
import { useParams } from "react-router-dom"

export function AreaDetailPage() {
  const { areaId } = useParams()
  const { open } = useOpenModal()

  const { data: area } = useGetArea({
    area_id: areaId as string,
  })

  const openCreateRoomDrawer = () => {
    open(CRUDRoomDrawer, {
      area_id: areaId
    })
  }

  return (
    <div className="">
      <div
        className="w-full h-[150px] relative overflow-hidden flex justify-center items-center"
      // style={{
      //   backgroundImage: `url("${areaData?.imageCover}")`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center'
      // }}
      >
        <div className="absolute inset-0 bg-black/30 -z-1" />
        <h3 className="text-center font-bold text-2xl relative z-10 text-white truncate w-full">{area?.area_name}</h3>
      </div>

      <div className="p-4 ">
        <Button
          type="button"
          variant={'outline'}
          className="w-full border-gray-400 mb-4"
          onClick={openCreateRoomDrawer}
        >+ Tạo phòng</Button>
        <RoomList />
      </div>
    </div>
  )
}

