import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer"
import { useCreateRentee, useUpdateRentee } from "@/hooks/queries/rentee"
import { useToast } from "@/hooks/utils"
import { Api, Common, Rentee } from "@/interfaces"
import { useRef } from "react"
import { CreatRenteeForm } from "../create-form"


interface CreateRenteeFormRef {
    getData: () => Api.RenteeApi.CreateRenteePayload
}

interface CRUDTodoModalProps extends Common.ModalProps {
    initialValue: Rentee.Detail
}

enum MODE {
    CREATE = 'CREATE',
    EDIT = 'EDIT'
}

export function CreateEditRenteeDrawer({ initialValue, open = true, onClose }: CRUDTodoModalProps) {
    const { toastError, toastSuccess } = useToast()
    const createRenteeFormRef = useRef<CreateRenteeFormRef>(null)
    const { mutateAsync: createAreaAsync } = useCreateRentee()
    const { mutateAsync: updateAreaAsync } = useUpdateRentee()
    const onSubmit = async () => {
        try {
            const payload = await createRenteeFormRef.current?.getData();
            if (!payload) return;

            const mode = initialValue ? MODE.EDIT : MODE.CREATE
            if (mode === MODE.EDIT) {
                await updateAreaAsync({
                    id: initialValue._id,
                    ...payload
                })
                toastSuccess("Cập nhật người thuê thành công!")
            } else {
                await createAreaAsync(payload)
                toastSuccess("Tạo người thuê thành công!")
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
            <DrawerContent className="h-[70dvh]">
                <DrawerHeader>
                    <DrawerTitle>{initialValue ? `Cập nhật người thuê` : 'Tạo người thuê mới'}</DrawerTitle>
                </DrawerHeader>
                <DrawerDescription className="px-4">
                    <CreatRenteeForm ref={createRenteeFormRef} initialValue={initialValue} />
                </DrawerDescription>
                <DrawerFooter className="flex w-full gap-x-2 flex-row">
                    <Button variant="outline" className="flex-1" onClick={() => onClose?.()}>Thoát</Button>
                    <Button className="flex-1" onClick={onSubmit}>Gửi</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
