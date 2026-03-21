import type { LoginFormValues } from '../../model/validation';
import { useFormContext } from 'react-hook-form';

export const UsernameField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginFormValues>();
  return (
    <div>
      <label htmlFor="username">Username</label>

      <input
        id="username"
        type="text"
        placeholder="введите username..."
        {...register('username')}
      />

      {errors.username && <p>{errors.username.message}</p>}
    </div>
  );
};
