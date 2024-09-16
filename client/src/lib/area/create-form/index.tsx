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
import { Area } from "@/interfaces";
import { AreaFormSchema } from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

type Props = {
    initialValue?: Area.Detail
}

export const CreatAreaForm = forwardRef(({ initialValue }: Props, ref) => {
    const form = useForm<yup.InferType<typeof AreaFormSchema>>({
        defaultValues: {
            area_name: initialValue?.area_name || '',
            electricity_unit_price: initialValue?.electricity_unit_price || 0,
            water_unit_price: initialValue?.water_unit_price || 0,
        },
        resolver: yupResolver(AreaFormSchema)
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
                    name="area_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên khu nhà</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên khu nhà" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="electricity_unit_price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Đơn giá điện</FormLabel>
                            <FormControl>
                                <CurrencyInput
                                    {...field}
                                    placeholder="Nhập đơn giá"
                                    className={
                                        "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="water_unit_price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Đơn giá nước</FormLabel>
                            <FormControl>
                                <CurrencyInput
                                    {...field}
                                    placeholder="Nhập đơn giá"
                                    className={
                                        "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* <div>
                    <Label
                        htmlFor={'image-cover'}
                    />
                    <FormLabel>Cover image</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="Input image cover"
                            type="file"
                            id='image-cover'
                            onChange={handleUploadFile}
                        />
                    </FormControl>
                </div> */}

                {/* {imageCover ? (
                    <div
                        className="w-full h-[200px] rounded-lg shadow"
                        style={{
                            backgroundImage: `url("${imageCover}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}

                    />
                ) : null} */}
                {/* {form.formState.errors.imageCover ? (<p
                    className={cn("text-sm font-medium text-red-500 dark:text-red-900")}
                >
                    {form.formState.errors.imageCover.message}
                </p>) : null} */}




                {/* <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about your todo"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
            </form>
        </Form>
    )
})
