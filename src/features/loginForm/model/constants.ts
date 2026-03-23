import type { LoginFormValues } from './validation';

export const formDefaultValues: LoginFormValues = {
  username: '',
  email: '',
  password: '',
  confirm: '',
  links: [{ url: '' }],
};
