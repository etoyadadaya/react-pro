import type { LoginFormValues } from '../../model/validation';
import { useFormContext } from 'react-hook-form';

export const PasswordField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginFormValues>();
  return (
    <div>
      <label htmlFor="password">Password</label>

      <input
        id="password"
        type="text"
        placeholder="введите password..."
        {...register('password')}
      />

      {errors.password && <p>{errors.password.message}</p>}
    </div>
  );
};
