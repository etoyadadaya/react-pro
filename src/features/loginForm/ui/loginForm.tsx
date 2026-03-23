import { UsernameField } from './fields/username';
import { EmailField } from './fields/email';
import { PasswordField } from './fields/password';
import { ConfirmField } from './fields/confirm';
import { LinksField } from './fields/links';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, type LoginFormValues } from '../model/validation';
import { formDefaultValues } from '../model/constants';

export const LoginForm = () => {
  const methods = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: formDefaultValues,
    mode: 'onBlur',
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <UsernameField />
          <EmailField />
          <PasswordField />
          <ConfirmField />
          <LinksField />

          <button type="submit">Отправить</button>
        </form>
      </FormProvider>
    </div>
  );
};
