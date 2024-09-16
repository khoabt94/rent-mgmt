import * as yup from 'yup'

export const AreaFormSchema = yup.object().shape({
    area_name: yup.string()
        .required('Vui lòng nhập tên khu nhà'),
    electricity_unit_price: yup.number()
        .required('Vui lòng nhập tên khu nhà')
        .min(0, 'Đơn giá tối thiểu bằng 0'),
    water_unit_price: yup.number()
        .required('Vui lòng nhập tên khu nhà')
        .min(0, 'Đơn giá tối thiểu bằng 0'),
});