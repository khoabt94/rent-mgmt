import { Button } from "@/components/ui/button"
import { CreateEditRenteeDrawer } from "@/lib/rentee/drawer"
import { RenteeList } from "@/lib/rentee/list"
import { Plus } from "lucide-react"
import { useState } from "react"

export function RenteePage() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  const openCreateRenteeDrawer = () => {
    setIsOpenDrawer(true)
  }

  return (
    <>

      <div className="p-4 ">
        <RenteeList />
      </div>
      <Button
        type="button"
        variant={'outline'}
        className="flex items-center justify-center rounded-full size-10 fixed right-5 bottom-5 bg-gray-900 z-50 !p-0"
        onClick={openCreateRenteeDrawer}
      >
        <Plus color="#ffffff" size={20} strokeWidth={4} />
      </Button>
      <CreateEditRenteeDrawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer} />
    </>
  )
}

