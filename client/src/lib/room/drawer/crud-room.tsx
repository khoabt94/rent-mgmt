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
  initialValue: Room.Detail
  area_id: string
}

enum MODE {
  CREATE = 'CREATE',
  EDIT = 'EDIT'
}

export function CRUDRoomDrawer({ initialValue, open = true, onClose, area_id }: CRUDRoomModalProps) {
  const { toastError, toastSuccess } = useToast()
  const createRoomFormRef = useRef<CreateRoomFormRef>(null)
  const { mutateAsync: createRoomAsync } = useCreateRoom()
  const { mutateAsync: updateRoomAsync } = useUpdateRoom()

  const onSubmit = async () => {
    try {
      const payload = await createRoomFormRef.current?.getData();
      if (!payload) return;
      const mode = initialValue ? MODE.EDIT : MODE.CREATE
      if (mode === MODE.EDIT) {
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
          <Button variant="outline" className="flex-1" onClick={() => onClose?.()}>Cancel</Button>
          <Button className="flex-1" onClick={onSubmit}>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
