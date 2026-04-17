import type { FormValues } from '../model/types';

export const getFormValues = (formData: FormData): FormValues => {
  return {
    firstName: String(formData.get('firstName') ?? ''),
    email: String(formData.get('email') ?? ''),
    about: String(formData.get('about') ?? ''),
  };
};
