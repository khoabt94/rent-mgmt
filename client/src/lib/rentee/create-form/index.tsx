import { Spinner } from "@/components/common/spinner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAreas, useGetRooms } from "@/hooks/queries";
import { useToast, useUploadFile } from "@/hooks/utils";
import { IDInfo, Rentee } from "@/interfaces";
import { RenteeFormSchema } from "@/schema";
import { useAuthStore } from "@/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

type Props = {
    initialValue?: Rentee.Detail
}

const exampleInfo: IDInfo = {
    address: "92 VÀNH ĐAI PHI TRƯỜNG, AN THỚI, BÌNH THỦY, TP CẦN THƠ",
    dob: "10/09/1994",
    id: "092094000007",
    name: "BÙI TIẾN KHOA",
}

export const CreatRenteeForm = forwardRef(({ initialValue }: Props, ref) => {
    const { toastError } = useToast()
    const { user } = useAuthStore()
    const { uploadFile } = useUploadFile()
    const { data: dataArea } = useGetAreas({})
    const areas = useMemo(() => dataArea?.items || [], [dataArea])

    const [isFetchingIDInfo, setIsFetchingIDInfo] = useState(false)
    const form = useForm<yup.InferType<typeof RenteeFormSchema>>({
        defaultValues: {
            rentee_id: initialValue?.rentee_id || '',
            rentee_name: initialValue?.rentee_name || '',
            image_url: initialValue?.image_url || '',
            room: initialValue?.room?._id || '',
            area: initialValue?.room?.area || '',
            address: initialValue?.address || '',
            dob: initialValue?.dob || '',
            owner: initialValue?.dob || user?._id,
        },
        resolver: yupResolver(RenteeFormSchema)
    })
    const imageCover = form.watch('image_url')
    const address = form.watch('address')
    const dob = form.watch('dob')
    const rentee_id = form.watch('rentee_id')
    const rentee_name = form.watch('rentee_name')
    const area = form.watch('area')
    const { data: dataRoom, refetch
    } = useGetRooms(
        area || '',
    )
    const rooms = useMemo(() => {
        return dataRoom ? dataRoom?.items : []
    }, [dataRoom])

    const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const file = e.target.files[0];
        setIsFetchingIDInfo(true)
        const { address, dob, id, name } = exampleInfo
        try {
            form.reset((prev) => ({
                ...prev,
                address,
                dob,
                rentee_id: id,
                rentee_name: name
            }))
            await uploadFile(file, (imageUrl: string) => form.setValue('image_url', imageUrl))
            // await IDVerification(file, async (idInfo) => {
            //     form.setValue('rentee_id', idInfo.rentee_id)
            //     form.setValue('rentee_name', idInfo.rentee_name)
            //     form.setValue('info', idInfo)
            //     await uploadFile(file, (imageUrl: string) => form.setValue('image_url', imageUrl))
            // })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toastError(error.message)
        } finally {
            setIsFetchingIDInfo(false)
        }

    }

    useImperativeHandle(ref, () => ({
        getData: async () => {
            if (await form.trigger()) {
                return form.getValues();
            }
            return null;
        },
    }));


    return (

        <Form {...form}>
            <form className="flex flex-col gap-y-5">
                <div>
                    <Label
                        htmlFor={'image-cover'}
                    />
                    <FormLabel>Hình CCCD</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="Input image cover"
                            type="file"
                            id='image-cover'
                            onChange={handleUploadFile}
                            className="mt-3"
                        />
                    </FormControl>
                </div>


                {/* {form.formState.errors.imageCover ? (<p
                    className={cn("text-sm font-medium text-red-500 dark:text-red-900")}
                >
                    {form.formState.errors.imageCover.message}
                </p>) : null} */}


                {isFetchingIDInfo ? <Spinner /> : (
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <p className="font-bold block w-[30%]">Số CCCD:</p>
                            <p className="block flex-1">{rentee_id}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="font-bold block w-[30%]">Tên:</p>
                            <p className="block flex-1">{rentee_name}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="font-bold block w-[30%]">Ngày sinh:</p>
                            <p className="block flex-1">{dob}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="font-bold block w-[30%]">Địa chỉ:</p>
                            <p className="block flex-1">{address}</p>
                        </div>
                    </div>
                )}
                {imageCover ? (
                    <div
                        className="w-full h-[100px] rounded-lg shadow bg-gray-300"
                        style={{
                            backgroundImage: `url("${imageCover}")`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}

                    />
                ) : null}
                <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                onValueChange={(value: string) => {
                                    console.log("🚀 ~ CreatRenteeForm ~ value:", value)
                                    field.onChange(value)
                                    refetch()
                                }}
                                value={String(field.value)}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn khu nhà" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {areas.map(area => (
                                        <SelectItem
                                            value={area._id}
                                            key={area._id}
                                            className=""
                                        >
                                            <div className="flex gap-x-2 items-center">
                                                <p>
                                                    {area.area_name}
                                                </p>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="room"
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                onValueChange={(value: string) => field.onChange(value)}
                                value={String(field.value)}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn phòng" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {rooms.map(room => (
                                        <SelectItem
                                            value={String(room._id)}
                                            key={room._id}
                                            className=""
                                        >
                                            <div className="flex gap-x-2 items-center">
                                                <p>
                                                    {room.room_name}
                                                </p>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
})
