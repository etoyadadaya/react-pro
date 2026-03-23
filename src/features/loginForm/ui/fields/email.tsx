import type { LoginFormValues } from '../../model/validation';
import { useFormContext } from 'react-hook-form';

export const EmailField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginFormValues>();
  return (
    <div>
      <label htmlFor="email">Email</label>

      <input
        id="email"
        type="text"
        placeholder="введите email..."
        {...register('email')}
      />

      {errors.email && <p>{errors.email.message}</p>}
    </div>
  );
};
