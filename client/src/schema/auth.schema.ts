import validator from 'validator'
import * as yup from 'yup'


export const LoginFormSchema = yup.object().shape({
    email: yup.string()
        .required('Vui lòng nhập email')
        .test('valid_email', (val: string | undefined) => !!val && validator.isEmail(val)),
    password: yup.string()
        .required('Vui lòng nhập mật khẩu')
        .min(6, 'Mật khẩu có tối thiểu 6 chữ số')
        .matches(/^[0-9]+$/, "Mật khẩu chỉ bao gồm chữ số"),
});

export const SignupFormSchema = yup.object().shape({
    username: yup.string()
        .required('Vui lòng nhập tên'),
    email: yup.string()
        .required('Vui lòng nhập email')
        .test('valid_email', (val: string | undefined) => !!val && validator.isEmail(val)),
    password: yup.string()
        .required('Vui lòng nhập mật khẩu')
        .min(6, 'Mật khẩu có tối thiểu 6 chữ số')
        .matches(/^[0-9]+$/, "Mật khẩu chỉ bao gồm chữ số"),
    password_confirm: yup.string()
        .required('Vui lòng xác nhận mật khẩu')
        .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),
});

export const ForgotPasswordFormSchema = yup.object().shape({
    email: yup.string()
        .required('Please provide your email')
        .test('valid_email', (val: string | undefined) => !!val && validator.isEmail(val)),
});

export const ResetPasswordFormSchema = yup.object().shape({
    password: yup.string()
        .required('Please provide a password')
        .min(6, 'A password should have at least 6 characters'),
    password_confirm: yup.string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords not match'),
});