import { Button } from "@/components/ui/button"
import { CreateCollectionDrawer } from "@/lib/collection/drawer/crud-collection"
import { useState } from "react"

export function CollectionPage() {
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false)

  const openCreateCollectionDrawer = () => {
    setOpenCreateDrawer(true)
  }

  return (
    <>
      <div className="">
        <div className="p-4 ">
          <Button
            type="button"
            variant={'outline'}
            className="w-full border-gray-400 mb-4"
            onClick={openCreateCollectionDrawer}
          >
            + Tạo kỳ thu tiền
          </Button>
        </div>
      </div>
      <CreateCollectionDrawer open={openCreateDrawer} onOpenChange={setOpenCreateDrawer} />
    </>
  )
}

