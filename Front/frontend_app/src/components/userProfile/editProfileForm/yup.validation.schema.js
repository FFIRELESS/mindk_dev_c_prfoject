import * as Yup from 'yup';

export const userFormSchema = Yup.object().shape({
  University_ID: Yup.number().typeError('University_ID must be a number').required(),
  Username: Yup.string('Username must not be empty').required(),
  Fullname: Yup.string('Fullname must not be empty').required(),
  Email: Yup.string().email('Email is incorrect').required(),
  Phone: Yup.string().matches(
    /^\+[0-9]{3}\d{9}$/g,
    'Invalid phone number',
  ).required(),
  FName_Visibility: Yup.string().required(),
  Email_Visibility: Yup.string().required(),
  Phone_Visibility: Yup.string().required(),
});
