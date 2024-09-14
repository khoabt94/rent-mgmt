import * as yup from 'yup'

export const AreaFormSchema = yup.object().shape({
    area_name: yup.string()
        .required('Vui lòng nhập tên khu nhà'),
});