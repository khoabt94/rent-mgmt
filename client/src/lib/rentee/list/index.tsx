import { useGetRentees } from "@/hooks/queries"
import { useOpenModal } from "@/hooks/utils/use-open-modal"
import { Rentee } from "@/interfaces"
import { useMemo } from "react"
import { CreateEditRenteeDrawer } from "../drawer"
import { RenteeItem } from "./item"

export function RenteeList() {
  const { data } = useGetRentees()
  const rentees = useMemo(() => data?.items || [], [data])
  const { open } = useOpenModal()
  // const { mutateAsync: deleteProject } = useDeleteProject()
  const openUpdateRenteeDrawer = (rentee: Rentee.Detail) => {
    open(CreateEditRenteeDrawer, {
      initialValue: rentee
    })
  }
  return (
    <div className="flex flex-col gap-y-4 w-full">
      {rentees.length ? rentees.map((rentee) => (
        <RenteeItem
          onClickEdit={openUpdateRenteeDrawer}
          rentee={rentee}
          key={rentee._id}
        />
      ))
        : <p className="w-full text-center italic">Không có khu nhà nào.<br />Hãy tạo một khu nhà nhé!</p>
      }
    </div>
  )

}
