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
