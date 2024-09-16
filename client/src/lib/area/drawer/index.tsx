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
import { Api, Area, Common } from "@/interfaces"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { CreatAreaForm } from "../create-form"


interface CreateAreaormRef {
    getData: () => Api.AreaApi.CreateAreaPayload
}

interface CRUDTodoModalProps extends Common.ModalProps {
    initialValue: Area.Detail
}

enum MODE {
    CREATE = 'CREATE',
    EDIT = 'EDIT'
}

export function CreateEditAreaDrawer({ initialValue, open = true, onClose }: CRUDTodoModalProps) {
    const { toastError, toastSuccess } = useToast()
    const navigate = useNavigate()
    const createAreaFormRef = useRef<CreateAreaormRef>(null)
    const { mutateAsync: createAreaAsync } = useCreateArea()
    const { mutateAsync: updateAreaAsync } = useUpdateArea()
    const onSubmit = async () => {
        try {
            const payload = await createAreaFormRef.current?.getData();
            if (!payload) return;

            const mode = initialValue ? MODE.EDIT : MODE.CREATE
            if (mode === MODE.EDIT) {
                await updateAreaAsync({
                    area_id: initialValue._id,
                    ...payload
                })
                navigate(siteConfig.paths.area(initialValue._id))
                toastSuccess("Cập nhật khu nhà thành công!")
            } else {
                const res = await createAreaAsync(payload)
                toastSuccess("Tạo khu nhà thành công!")
                navigate(siteConfig.paths.area(res._id))

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
                    <DrawerTitle>{initialValue ? `Cập nhật khu nhà ${initialValue.area_name}` : 'Tạo khu nhà mới'}</DrawerTitle>
                </DrawerHeader>
                <DrawerDescription className="px-4 pb-10">
                    <CreatAreaForm ref={createAreaFormRef} initialValue={initialValue} />
                </DrawerDescription>
                <DrawerFooter className="flex w-full gap-x-2 flex-row">
                    <Button variant="outline" className="flex-1" onClick={() => onClose?.()}>Thoát</Button>
                    <Button className="flex-1" onClick={onSubmit}>Gửi</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
