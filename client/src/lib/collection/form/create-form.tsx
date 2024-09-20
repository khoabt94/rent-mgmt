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
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { currencyFormatter } from "@/helpers/currency";
import { useGetArea, useGetLatestCollection } from "@/hooks/queries";
import { Room } from "@/interfaces";
import { CollectionFormSchema } from "@/schema";
import { cn } from "@/utils/tailwind";
import { yupResolver } from "@hookform/resolvers/yup";
import { forwardRef, useEffect, useImperativeHandle, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

type Props = {
    room: Room.Detail
}

export const CreatCollectionForm = forwardRef(({ room }: Props, ref) => {
    const { data: dataLatestCollection } = useGetLatestCollection(room._id)
    const { data: area } = useGetArea({ area_id: room.area._id })
    const latestCollection = useMemo(() => dataLatestCollection ? dataLatestCollection.items[0] : null, [dataLatestCollection])
    const form = useForm<yup.InferType<typeof CollectionFormSchema>>({
        defaultValues: {
            collection_name: `Kỳ thu tiền ngày ${new Date().toLocaleDateString()}`,
            room: room._id,
            end_electricity: 0,
            end_water: 0,
            begin_electricity: 0,
            begin_water: 0,
            other_fee: 0,
            deduction: 0,
        },
        resolver: yupResolver(CollectionFormSchema)
    })

    const {
        begin_electricity = 0,
        begin_water = 0,
        end_electricity,
        end_water,
        other_fee,
        deduction
    } = form.watch()

    const noOfElectricity = end_electricity - begin_electricity
    const noOfWater = end_water - begin_water
    const electricityUnitPrice = area?.electricity_unit_price || 0
    const waterUnitPrice = area?.water_unit_price || 0

    const total = room.rent_fee + noOfElectricity * electricityUnitPrice + noOfWater * waterUnitPrice + other_fee - deduction


    useImperativeHandle(ref, () => ({
        getData: async () => {
            if (await form.trigger()) {
                return form.getValues();
            }
            return null;
        },
    }));

    useEffect(() => {
        if (latestCollection) {
            form.setValue('begin_electricity', latestCollection.end_electricity)
            form.setValue('end_electricity', latestCollection.end_electricity)
            form.setValue('begin_water', latestCollection.end_water)
            form.setValue('end_water', latestCollection.end_water)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [latestCollection])

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
                                <Input disabled placeholder="Nhập tên kỳ thu tiền" className="disabled:opacity-100 bg-gray-100" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Table>
                    <TableHeader className="bg-slate-100">
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead className="w-[80px]">Số đầu</TableHead>
                            <TableHead className="w-[80px]">Số cuối</TableHead>
                            <TableHead className="text-right w-[80px]">Số lượng</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow key='electric'>
                            <TableCell className="font-medium">Điện</TableCell>
                            <TableCell className="w-[80px]">{begin_electricity || '--'}</TableCell>
                            <TableCell>
                                <FormField
                                    control={form.control}
                                    name="end_electricity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className={cn("w-[80px] h-8", form.formState.errors.end_electricity && 'border-red-500')}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </TableCell>
                            <TableCell className="text-right w-[80px]">{currencyFormatter(noOfElectricity) || '--'}</TableCell>
                        </TableRow>
                        <TableRow key='electric-unit' className="h-5">
                            <TableCell colSpan={2} className="font-medium"></TableCell>
                            <TableCell colSpan={2} className="text-right">
                                {noOfElectricity ? (
                                    <p>
                                        x <span className="font-medium">{area?.electricity_unit_price || 0}</span>
                                        {" "}
                                        = <span className="font-medium">{currencyFormatter(noOfElectricity * electricityUnitPrice) || 0}</span>
                                    </p>
                                ) : <div className="h-5"></div>}
                            </TableCell>
                        </TableRow>
                        <TableRow key='electric'>
                            <TableCell className="font-medium">Nước</TableCell>
                            <TableCell className="w-[80px]">{begin_water || '--'}</TableCell>
                            <TableCell>
                                <FormField
                                    control={form.control}
                                    name="end_water"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className={cn("w-[80px] h-8", form.formState.errors.end_water && 'border-red-500')}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </TableCell>
                            <TableCell className="text-right w-[80px]">{currencyFormatter(noOfWater) || '--'}</TableCell>
                        </TableRow>
                        <TableRow key='water-unit' className="h-5">
                            <TableCell colSpan={2} className="font-medium"></TableCell>
                            <TableCell colSpan={2} className="text-right">
                                {noOfWater ? (
                                    <p>
                                        x <span className="font-medium">{area?.water_unit_price || 0}</span>
                                        {" "}
                                        = <span className="font-medium">{currencyFormatter(noOfWater * waterUnitPrice) || 0}</span>
                                    </p>
                                ) : <div className="h-5"></div>}
                            </TableCell>
                        </TableRow>
                        <TableRow key='rent_fee' className="h-10">
                            <TableCell className="font-medium h-10" colSpan={2}>Tiền phòng</TableCell>
                            <TableCell className="w-[80px]" colSpan={2}>
                                <p className="h-10 flex items-center justify-end font-medium">{currencyFormatter(room.rent_fee)}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow key='other_fee'>
                            <TableCell className="font-medium" colSpan={2}>Phí khác</TableCell>
                            <TableCell className="w-[80px]" colSpan={2}>
                                <FormField
                                    control={form.control}
                                    name="other_fee"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <CurrencyInput
                                                    placeholder="Nhập phí khác"
                                                    className="flex h-10 w-full text-right rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow key='deduction'>
                            <TableCell className="font-medium" colSpan={2}>Giảm trừ</TableCell>
                            <TableCell className="w-[80px]" colSpan={2}>
                                <FormField
                                    control={form.control}
                                    name="deduction"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <CurrencyInput
                                                    placeholder="Nhập giảm trừ"
                                                    className="flex h-10 w-full text-right rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TableCell>
                        </TableRow>

                    </TableBody>
                    <TableFooter className="bg-slate-100">
                        <TableRow>
                            <TableCell colSpan={3} className="text-base">Tổng tiền</TableCell>
                            <TableCell className="text-right text-base">{currencyFormatter(total)}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

            </form>
        </Form >
    )
})
