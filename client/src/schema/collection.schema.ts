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

export const EditCollectionFormSchema = yup.object().shape({
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
    amount_due: yup.number().required('Vui lòng nhập tên phòng'),
    amount_collect: yup.number()
        .required('Vui lòng nhập tên phòng')
        .test({
            name: 'amount_collect_greater_than_amount_due',
            exclusive: false,
            params: {},
            message: 'Số tiền thu phải nhỏ hơn tổng tiền',
            test: function (value) {
                return (value || 0) <= this.parent.amount_due
            },
        }),
});