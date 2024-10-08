"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from '@/components/ui/password-input'
import { useAuthActions } from '@/hooks/utils'
import { SignupFormSchema } from '@/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export function SignupForm() {
    const { signUp } = useAuthActions()
    const form = useForm<yup.InferType<typeof SignupFormSchema>>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            password_confirm: '',
        },
        resolver: yupResolver(SignupFormSchema),
        shouldFocusError: false,
    })

    const onSubmit = async (payload: yup.InferType<typeof SignupFormSchema>) => {
        signUp(payload)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Tên của bạn" {...field} className='text-base h-[50px]' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Email của bạn" {...field} className='text-base h-[50px]' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <PasswordInput placeholder="Mật khẩu" {...field} className='text-base h-[50px]' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password_confirm"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <PasswordInput placeholder="Xác nhận mật khẩu" {...field} className='text-base h-[50px]' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='mt-5'>Xác nhận</Button>
            </form>
        </Form>
    )
}

