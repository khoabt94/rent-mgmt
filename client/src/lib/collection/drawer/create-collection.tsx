import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer"
import { useCreateCollection } from "@/hooks/queries"
import { useToast } from "@/hooks/utils"
import { Common, Room } from "@/interfaces"
import { useRef } from "react"
import { CreatCollectionForm } from "../form/create-collection"
import * as yup from 'yup';
import { CollectionFormSchema } from "@/schema"

type CreateCollectionPayload = yup.InferType<typeof CollectionFormSchema>

interface CreateCollectionFormRef {
  getData: () => CreateCollectionPayload
}

interface CreateCollectionDrawerProps extends Common.ModalProps {
  room: Room.Detail

}


export function CreateCollectionDrawer({ open = true, onClose, room }: CreateCollectionDrawerProps) {
  const { toastError, toastSuccess } = useToast()
  const createCollectionFormRef = useRef<CreateCollectionFormRef>(null)
  const { mutateAsync: createCollectionAsync } = useCreateCollection()

  const onSubmit = async () => {
    try {
      const payload = await createCollectionFormRef.current?.getData();
      if (!payload) return;
      payload.begin_electricity = undefined
      payload.begin_water = undefined
      await createCollectionAsync(payload)
      toastSuccess("Tạo kỳ thu tiền thành công")

      onClose?.()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toastError(error.message)
    }
  }
  const onOpenChange = (flag: boolean) => {
    if (!flag) onClose?.()
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Tạo kỳ thu tiền</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="px-4 pb-10">
          <CreatCollectionForm
            ref={createCollectionFormRef}
            room={room}
          />
        </DrawerDescription>
        <DrawerFooter className="flex w-full gap-x-2 flex-row">
          <Button variant="outline" className="flex-1" onClick={() => onClose?.()}>Thoát</Button>
          <Button className="flex-1" onClick={onSubmit}>Gửi</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
