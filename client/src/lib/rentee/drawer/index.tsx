import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer"
import { siteConfig } from "@/configs/site"
import { useCreateArea, useUpdateArea } from "@/hooks/queries"
import { useToast } from "@/hooks/utils"
import { Api, Area, Common, Rentee } from "@/interfaces"
import { useAuthStore } from "@/store"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { CreatRenteeForm } from "../create-form"


interface CreateAreaormRef {
    getData: () => Api.AreaApi.CreateAreaPayload
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
    const { user } = useAuthStore()
    const navigate = useNavigate()
    const createRenteeFormRef = useRef<CreateAreaormRef>(null)
    const { mutateAsync: createAreaAsync } = useCreateArea()
    const { mutateAsync: updateAreaAsync } = useUpdateArea()
    const onSubmit = async () => {
        if (!user) return
        // try {
        //     const payload = await createRenteeFormRef.current?.getData();
        //     if (!payload) return;

        //     const mode = initialValue ? MODE.EDIT : MODE.CREATE
        //     if (mode === MODE.EDIT) {
        //         await updateAreaAsync({
        //             area_id: initialValue._id,
        //             ...payload
        //         })
        //         navigate(siteConfig.paths.area(initialValue._id))
        //         toastSuccess("Cập nhật người thuê thành công!")
        //     } else {
        //         await createAreaAsync({
        //             ...payload,
        //             user: user._id
        //         })
        //         toastSuccess("Tạo người thuê thành công!")
        //         navigate(siteConfig.paths.area(1))

        //     }

        //     onClose?.()
        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // } catch (error: any) {
        //     toastError(error.message)
        // }
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
