import type { LoginFormValues } from '../../model/validation';
import { useFormContext } from 'react-hook-form';

export const ConfirmField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginFormValues>();
  return (
    <div>
      <label htmlFor="confirm">Password confirmation</label>

      <input
        id="confirm"
        type="text"
        placeholder="введите подтверждение пароля..."
        {...register('confirm')}
      />

      {errors.confirm && <p>{errors.confirm.message}</p>}
    </div>
  );
};
