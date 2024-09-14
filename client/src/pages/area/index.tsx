import { useGetArea } from "@/hooks/queries"
import { useParams } from "react-router-dom"

export function AreaDetailPage() {
  const { areaId } = useParams()

  const { data: area } = useGetArea({
    area_id: areaId as string,
  })



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
        {/* <TodoList /> */}
      </div>
    </div>
  )
}

