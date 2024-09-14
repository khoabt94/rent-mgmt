import * as yup from 'yup'

export const RoomFormSchema = yup.object().shape({
    room_name: yup.string()
        .required('Vui lòng nhập tên phòng'),
    area: yup.string()
        .required('Vui lòng cung cấp khu nhà'),
});