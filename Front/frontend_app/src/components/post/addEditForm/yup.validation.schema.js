import * as Yup from 'yup';

export const postFormSchema = Yup.object().shape({
  Title: Yup.string('Title must not be empty').max(125, 'Too Long!').required(),
  Text: Yup.string('Text must not be empty').required(),
  Visibility: Yup.string('Visibility must not be empty').required(),
});
