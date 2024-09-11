import * as yup from 'yup'

export const AreaFormSchema = yup.object().shape({
    areaName: yup.string()
        .required('Name is a required field!'),
});