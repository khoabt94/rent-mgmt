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
            room_name: initialValue?.room_name || ''
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

            </form>
        </Form>
    )
})
