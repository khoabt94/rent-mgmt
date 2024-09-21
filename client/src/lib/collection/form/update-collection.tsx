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
import { Collection } from "@/interfaces";
import { EditCollectionFormSchema } from "@/schema";
import { cn } from "@/utils/tailwind";
import { yupResolver } from "@hookform/resolvers/yup";
import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { genCollectionInfo } from "../helpers";
import { CollectionStatuses } from "@/constants/collection";

type Props = {
    initialValue: Collection.Detail
}

export const UpdateCollectionForm = forwardRef(({ initialValue }: Props, ref) => {
    const isPaid = initialValue.status === CollectionStatuses.COLLECTED
    const form = useForm<yup.InferType<typeof EditCollectionFormSchema>>({
        defaultValues: {
            collection_name: initialValue.collection_name,
            room: initialValue.room._id,
            end_electricity: initialValue.end_electricity,
            end_water: initialValue.end_water,
            begin_electricity: initialValue.begin_electricity,
            begin_water: initialValue.begin_water,
            other_fee: initialValue.other_fee,
            deduction: initialValue.deduction,
            amount_due: initialValue.amount_due,
            amount_collect: initialValue.amount_collect,
        },
        resolver: yupResolver(EditCollectionFormSchema)
    })

    const { electricity_unit_price, water_unit_price, rent_fee } = initialValue

    const {
        begin_electricity = 0,
        begin_water = 0,
        end_electricity,
        end_water,
        other_fee,
        deduction
    } = form.watch()

    const {
        amountDue,
        amountElectricity,
        amountWater,
        noOfElectricity,
        noOfWater,
    } = genCollectionInfo({
        end_electricity,
        begin_electricity,
        end_water,
        begin_water,
        electricity_unit_price,
        water_unit_price,
        rent_fee,
        other_fee,
        deduction
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
                                                    className={cn("w-[80px] h-8 disabled:opacity-100 bg-gray-100", form.formState.errors.end_electricity && 'border-red-500')}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    disabled
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
                                        x <span className="font-medium">{electricity_unit_price || 0}</span>
                                        {" "}
                                        = <span className="font-medium">{currencyFormatter(amountElectricity) || 0}</span>
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
                                                    className={cn("w-[80px] h-8 disabled:opacity-100 bg-gray-100", form.formState.errors.end_water && 'border-red-500')}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    disabled
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
                                        x <span className="font-medium">{water_unit_price || 0}</span>
                                        {" "}
                                        = <span className="font-medium">{currencyFormatter(amountWater) || 0}</span>
                                    </p>
                                ) : <div className="h-5"></div>}
                            </TableCell>
                        </TableRow>
                        <TableRow key='rent_fee' className="h-10">
                            <TableCell className="font-medium h-10" colSpan={2}>Tiền phòng</TableCell>
                            <TableCell className="w-[80px]" colSpan={2}>
                                <p className="h-10 flex items-center justify-end font-medium">{currencyFormatter(rent_fee)}</p>
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
                                                    disabled={isPaid}
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
                                                    disabled={isPaid}
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
                            <TableCell className="text-right text-base">{currencyFormatter(amountDue)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} className="text-sm">
                                <div className=" flex items-center gap-x-3">

                                    <p>Đã thu</p>
                                    <button
                                        type="button"
                                        className="underline text-blue-500"
                                        onClick={() => {
                                            form.setValue('amount_collect', initialValue.amount_due)
                                        }}
                                    >
                                        Thu đủ
                                    </button>
                                </div>
                            </TableCell>
                            <TableCell className="w-[80px] " colSpan={2}>
                                <FormField
                                    control={form.control}
                                    name="amount_collect"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <CurrencyInput
                                                    disabled={isPaid}
                                                    placeholder="Nhập tiền thu"
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
                    </TableFooter>
                </Table>

            </form>
        </Form >
    )
})
