import * as Yup from 'yup';

export const commentsFormSchema = Yup.object().shape({
  Text: Yup.string('Text must not be empty').max(255, 'Too Long!').required(),
});
