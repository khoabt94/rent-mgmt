import * as yup from 'yup'

export const CollectionFormSchema = yup.object().shape({
    collection_name: yup.string()
        .required('Vui lòng nhập tên phòng'),
    room: yup.string()
        .required('Vui lòng nhập tên phòng'),
    end_electricity: yup.number()
        .required('Vui lòng nhập tên phòng')
        .min(1, 'Vui lòng nhập tên phòng'),
    end_water: yup.number()
        .required('Vui lòng nhập tên phòng')
        .min(1, 'Vui lòng nhập tên phòng'),
    begin_electricity: yup.number(),
    begin_water: yup.number(),
    other_fee: yup.number()
        .required('Vui lòng nhập tên phòng'),
    deduction: yup.number()
        .required('Vui lòng nhập tên phòng'),
});