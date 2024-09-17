import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer"
import { useCreateCollection, useGetAreas } from "@/hooks/queries"
import { useToast } from "@/hooks/utils"
import { Common, Area } from "@/interfaces"
import { useMemo, useRef } from "react"
import { CreatCollectionForm } from "../create-form"
import { genCreateCollectionPayload } from "../helpers"
import { useNavigate } from "react-router-dom"
import { siteConfig } from "@/configs/site"

export interface CreateCollectionFormData {
  collection_name: string;
  collection_items: Area.Detail[];

}

interface CreateCollectionFormRef {
  getData: () => CreateCollectionFormData
}

interface CreateCollectionDrawerProps extends Common.ModalProps {
}


export function CreateCollectionDrawer({ open, onOpenChange }: CreateCollectionDrawerProps) {
  const { toastError, toastSuccess } = useToast()
  const navigate = useNavigate()
  const { data } = useGetAreas({})
  const areas = useMemo(() => data?.items || [], [data])
  const createCollectionFormRef = useRef<CreateCollectionFormRef>(null)
  const { mutateAsync: createCollectionAsync } = useCreateCollection()

  const onSubmit = async () => {
    try {
      const payload = await createCollectionFormRef.current?.getData();
      if (!payload) return;
      const res = await createCollectionAsync(genCreateCollectionPayload(payload))
      navigate(siteConfig.paths.collectionDetail(res._id))
      toastSuccess("Tạo kỳ thu tiền thành công")

      onOpenChange?.(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toastError(error.message)
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[70dvh]">
        <DrawerHeader>
          <DrawerTitle>Tạo kỳ thu tiền</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="px-4 pb-10">
          <CreatCollectionForm
            ref={createCollectionFormRef}
            areas={areas}
          />
        </DrawerDescription>
        <DrawerFooter className="flex w-full gap-x-2 flex-row">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange?.(false)}>Thoát</Button>
          <Button className="flex-1" onClick={onSubmit}>Gửi</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
