import * as yup from 'yup'

export const AreaFormSchema = yup.object().shape({
    area_name: yup.string()
        .required('Name is a required field!'),
});