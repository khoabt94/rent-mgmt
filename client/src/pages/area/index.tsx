import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetArea } from "@/hooks/queries"
import { CollectionList } from "@/lib/collection/list"
import { RoomList } from "@/lib/room/list"
import { useParams } from "react-router-dom"

export function AreaDetailPage() {
  const { areaId } = useParams()


  const { data: area } = useGetArea({
    area_id: areaId as string,
  })



  return (
    <>
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
          <Tabs defaultValue="room" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2 h-14">
              <TabsTrigger value="room" className="h-10">Phòng</TabsTrigger>
              <TabsTrigger value="collection" className="h-10">Phiếu thu</TabsTrigger>
            </TabsList>
            <TabsContent value="room">
              <RoomList />
            </TabsContent>
            <TabsContent value="collection">
              <CollectionList />
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </>
  )
}

