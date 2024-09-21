import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer"
import { useUpdateCollection } from "@/hooks/queries"
import { useToast } from "@/hooks/utils"
import { Collection, Common } from "@/interfaces"
import { EditCollectionFormSchema } from "@/schema"
import { CheckCheck } from "lucide-react"
import { useRef } from "react"
import * as yup from 'yup'
import { UpdateCollectionForm } from "../form/update-collection"
import { CollectionStatuses } from "@/constants/collection"

type UpdateCollectionPayload = yup.InferType<typeof EditCollectionFormSchema>

interface UpdateCollectionFormRef {
  getData: () => UpdateCollectionPayload
}

interface UpdateCollectionDrawerProps extends Common.ModalProps {
  initialValue: Collection.Detail

}


export function UpdateCollectionDrawer({ open = true, onClose, initialValue }: UpdateCollectionDrawerProps) {
  const { toastError, toastSuccess } = useToast()
  const updateCollectionFormRef = useRef<UpdateCollectionFormRef>(null)
  const { mutateAsync: updateCollectionAsync } = useUpdateCollection()
  const isPaid = initialValue.status === CollectionStatuses.COLLECTED
  const onSubmit = async () => {
    try {
      const payload = await updateCollectionFormRef.current?.getData();
      if (!payload) return;
      const { end_electricity, end_water, deduction, other_fee, amount_collect } = payload
      await updateCollectionAsync({
        end_electricity, end_water, deduction, other_fee, amount_collect,
        id: initialValue._id
      })
      toastSuccess("Chỉnh sửa kỳ thu tiền thành công")

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
          <DrawerTitle>Chỉnh sửa kỳ thu tiền</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="px-4 pb-10">
          {isPaid && <p className="flex items-center gap-x-2 text-green-500"><CheckCheck color="#22c55e" /><span>Đã thu tiền</span></p>}
          <UpdateCollectionForm
            ref={updateCollectionFormRef}
            initialValue={initialValue}
          />
        </DrawerDescription>
        <DrawerFooter className="flex w-full gap-x-2 flex-row">
          <Button variant="outline" className="flex-1" onClick={() => onClose?.()}>Thoát</Button>
          {isPaid ? <></> : <Button className="flex-1" onClick={onSubmit}>Gửi</Button>}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
