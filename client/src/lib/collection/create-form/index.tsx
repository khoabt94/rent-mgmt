import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Area } from "@/interfaces";
import { forwardRef, useImperativeHandle } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import AreaGroup from "./area-group";
import { Accordion } from "@/components/ui/accordion";

type Props = {
    areas: Area.Detail[]
}

export const CreatCollectionForm = forwardRef(({ areas }: Props, ref) => {
    const form = useForm({
        defaultValues: {
            collection_name: `Kỳ thu tiền tháng ${new Date().getMonth()}/${new Date().getFullYear()}`,
            collection_items: areas.map(area => ({ ...area, room: area.room.map(room => ({ ...room, is_selected: true })) })),
        },
    })

    const { fields } = useFieldArray({
        name: 'collection_items',
        control: form.control
    })

    const watchCollectionItems = (indexArea: number) => form.watch(`collection_items.${indexArea}`)

    useImperativeHandle(ref, () => ({
        getData: async () => {
            if (await form.trigger()) {
                return form.getValues();
            }
            return null;
        },
    }));

    const onCheckedChange = (indexArea: number, indexRoom: number, flag: boolean) => {
        form.setValue(`collection_items.${indexArea}.room.${indexRoom}.is_selected`, flag)
    }

    const onCheckedAllChange = (indexArea: number, flag: boolean) => {
        const currentAreaRoomValue = form.getValues(`collection_items.${indexArea}.room`)
        form.setValue(`collection_items.${indexArea}.room`, currentAreaRoomValue.map(room => ({ ...room, is_selected: flag })))
    }


    return (

        <Form {...form}>
            <form className="flex flex-col gap-y-5">
                <FormField
                    control={form.control}
                    name="collection_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên kỳ thu tiền</FormLabel>
                            <FormControl>
                                <Input disabled {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="space-y-2">
                    <FormLabel>Chọn phòng</FormLabel>
                    <Accordion type="multiple" className="w-full space-y-4">
                        {fields.map((area, index) => (
                            <AreaGroup
                                area={area}
                                key={area._id}
                                indexArea={index}
                                onCheckedChange={onCheckedChange}
                                onCheckedAllChange={onCheckedAllChange}
                                watchCollectionItems={watchCollectionItems}
                            />)
                        )}
                    </Accordion>
                </div>
            </form>
        </Form>
    )
})
