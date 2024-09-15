import * as yup from 'yup'

export const RenteeFormSchema = yup.object().shape({
    rentee_id: yup.string()
        .required('Title is a required field!'),
    rentee_name: yup.string()
        .required('Cover image is a required field!'),
    image_url: yup.string()
        .required('Description is a required field!'),
    room: yup.string(),
    area: yup.string(),
    address: yup.string()
        .required('Description is a required field!'),
    dob: yup.string()
        .required('Description is a required field!'),
});