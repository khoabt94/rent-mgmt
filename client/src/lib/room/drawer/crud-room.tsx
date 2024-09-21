import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer"
import { useCreateRoom, useUpdateRoom } from "@/hooks/queries"
import { useToast } from "@/hooks/utils"
import { Api, Common, Room } from "@/interfaces"
import { useRef } from "react"
import { CreatRoomForm } from "../create-form"

type CreateRoomPayload = Omit<Api.RoomApi.CreateRoomPayload, 'project'>

interface CreateRoomFormRef {
  getData: () => CreateRoomPayload
}

interface CRUDRoomModalProps extends Common.ModalProps {
  initialValue?: Room.Detail
  area_id: string
}


export function CRUDRoomDrawer({ initialValue, open = true, onClose, area_id, onOpenChange }: CRUDRoomModalProps) {
  const { toastError, toastSuccess } = useToast()
  const createRoomFormRef = useRef<CreateRoomFormRef>(null)
  const { mutateAsync: createRoomAsync } = useCreateRoom()
  const { mutateAsync: updateRoomAsync } = useUpdateRoom()

  const onSubmit = async () => {
    try {
      const payload = await createRoomFormRef.current?.getData();
      if (!payload) return;
      if (initialValue) {
        await updateRoomAsync({
          room_id: initialValue._id,
          ...payload,
        })
        toastSuccess("Cập nhật phòng thành công")
      } else {
        await createRoomAsync({
          ...payload,
          area: area_id,
        })
        toastSuccess("Tạo phòng thành công")
      }
      onOpenChange?.(false)
      onClose?.()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toastError(error.message)
    }
  }


  return (
    <Drawer open={open} onOpenChange={(flag) => {
      if (!flag) onClose?.()
      onOpenChange?.(flag)
    }
    }>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{initialValue ? 'Cập nhật phòng' : 'Tạo phòng mới'}</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="px-4 pb-10">
          <CreatRoomForm
            ref={createRoomFormRef}
            initialValue={initialValue}
            areaId={area_id}
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
