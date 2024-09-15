import CurrencyInput from "@/components/common/input/currency-input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Room } from "@/interfaces";
import { RoomFormSchema } from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

type Props = {
    initialValue?: Partial<Room.Detail>
    areaId: string
}

export const CreatRoomForm = forwardRef(({ initialValue, areaId }: Props, ref) => {
    const form = useForm<yup.InferType<typeof RoomFormSchema>>({
        defaultValues: {
            area: areaId,
            room_name: initialValue?.room_name || '',
            rent_fee: initialValue?.rent_fee || 0,
        },
        resolver: yupResolver(RoomFormSchema)
    })


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
                <FormField
                    control={form.control}
                    name="room_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên phòng</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên phòng" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rent_fee"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Giá thuê</FormLabel>
                            <FormControl>
                                <CurrencyInput
                                    {...field}
                                    placeholder="Nhập giá thuê"
                                    className={
                                        "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
})
