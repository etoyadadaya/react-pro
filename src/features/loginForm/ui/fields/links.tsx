import type { LoginFormValues } from '../../model/validation';
import { useFieldArray, useFormContext } from 'react-hook-form';

export const LinksField = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<LoginFormValues>();

  const { fields, append, remove } = useFieldArray({ control, name: 'links' });

  return (
    <div>
      <p>Links</p>
      {fields.map((field, idx) => (
        <div key={field.id}>
          <label htmlFor={`links.${idx}.url`}>Link {idx + 1}</label>

          <input
            id={`links.${idx}.url`}
            type="url"
            placeholder="https://example.com"
            {...register(`links.${idx}.url`)}
          />

          {errors.links?.[idx]?.url && (
            <p>{errors?.links[idx]?.url?.message}</p>
          )}

          <button
            type="button"
            onClick={() => remove(idx)}
            disabled={fields.length === 1}
          >
            Удалить
          </button>
        </div>
      ))}

      <button type="button" onClick={() => append({ url: '' })}>
        Добавить ссылку
      </button>
    </div>
  );
};
