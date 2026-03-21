import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup.string().required('username обязателен для заполнения!'),

  email: yup
    .string()
    .email('невалидный email адрес!')
    .required('email обязателен для заполнения!'),

  password: yup.string().required('password обязателен для заполнения!').min(6),

  confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'password должен совпадать!')
    .required('confirm password обязателен для заполнения!'),

  links: yup
    .array()
    .of(
      yup.object({
        url: yup
          .string()
          .url('Некорректный URL!')
          .required('url обязателен для заполнения!'),
      })
    )
    .required(),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;
