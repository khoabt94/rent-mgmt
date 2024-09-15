import { Button } from "@/components/ui/button"
import { useOpenModal } from "@/hooks/utils/use-open-modal"
import { CreateEditRenteeDrawer } from "@/lib/rentee/drawer"
import { RenteeList } from "@/lib/rentee/list"

export function RenteePage() {
  const { open } = useOpenModal()


  const openCreateRenteeDrawer = () => {
    open(CreateEditRenteeDrawer, {
    })
  }

  return (
    <div className="">

      <div className="p-4 ">
        <Button
          type="button"
          variant={'outline'}
          className="w-full border-gray-400 mb-4"
          onClick={openCreateRenteeDrawer}
        >
          + Tạo người thuê
        </Button>
        <RenteeList />
      </div>
    </div>
  )
}

