import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useOpenModal } from "@/hooks/utils/use-open-modal"
import { Area } from "@/interfaces"
import {
    EllipsisVertical,
    Pencil,
    Trash2
} from "lucide-react"
import { CreateEditAreaDrawer } from "../drawer"

type Props = {
    area: Area.Detail
    onClick: () => void
}

export function MenuActions({ area, onClick }: Props) {
    const { open } = useOpenModal()
    // const { mutateAsync: deleteProject } = useDeleteProject()
    const openUpdateAreaDrawer = () => {
        open(CreateEditAreaDrawer, {
            initialValue: area
        })
        onClick()
    }

    // const openDeleteConfirmDialog = () => {
    //     open(DeleteConfirmModal, {
    //         onSubmit: async () => {
    //             try {
    //                 await deleteProject(area._id)
    //                 toastSuccess("Xóa khu nhà thành công")
    //                 navigate(siteConfig.paths.home())
    //                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //             } catch (error: any) {
    //                 toastError(error.message)
    //             }
    //         }
    //     })
    //     onClick()
    // }



    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-0">
                    <EllipsisVertical size={20} strokeWidth={1.5} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuItem className="px-0 py-2">
                    <Button
                        type="button"
                        variant={"ghost"}
                        className='flex flex-row gap-x-3'
                        onClick={openUpdateAreaDrawer}
                    >
                        <Pencil size={20} strokeWidth={1.5} />
                        <span className="text-sm">Sửa</span>
                    </Button>
                </DropdownMenuItem>

                <DropdownMenuItem className="px-0 py-2">
                    <Button
                        type="button"
                        variant={"ghost"}
                        className='flex flex-row gap-x-3'
                        onClick={() => { }}
                    >
                        <Trash2 size={20} strokeWidth={1.5} color='#EE4E4E' />
                        <span className="text-[#EE4E4E]">Xóa</span>
                    </Button>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
