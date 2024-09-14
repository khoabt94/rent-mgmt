import { useGetAreas } from "@/hooks/queries"
import { useMemo } from "react"
import { AreaItem } from "./item"
import { Area } from "@/interfaces"
import { CreateEditAreaDrawer } from "../drawer"
import { useOpenModal } from "@/hooks/utils/use-open-modal"

type Props = {
  onClick: () => void
}

export function AreaList({ onClick }: Props) {
  const { data } = useGetAreas({})
  const areas = useMemo(() => data?.items || [], [data])
  const { open } = useOpenModal()
  // const { mutateAsync: deleteProject } = useDeleteProject()
  const openUpdateAreaDrawer = (area: Area.Detail) => {
    open(CreateEditAreaDrawer, {
      initialValue: area
    })
    onClick()
  }
  return (
    <div className="flex flex-col gap-y-4 w-full">
      {areas.length ? areas.map((area) => (
        <AreaItem
          onClick={onClick}
          onClickEdit={openUpdateAreaDrawer}
          area={area}
          key={area._id}
        />
      ))
        : <p className="w-full text-center italic">Không có khu nhà nào.<br />Hãy tạo một khu nhà nhé!</p>
      }
    </div>
  )

}
