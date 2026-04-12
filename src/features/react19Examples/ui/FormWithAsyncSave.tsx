import { useActionState, useEffect, useRef, useState } from 'react';
import { formInitialState } from '../model/constants';
import { saveFormAction } from '../lib/saveFormAction';

export const FormWithAsyncSave = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, submit, isPending] = useActionState(
    saveFormAction,
    formInitialState
  );

  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  useEffect(() => {
    if (!state.lastSavedValue) {
      return;
    }

    formRef.current?.reset();
    setIsSuccessVisible(true);

    const timer = window.setTimeout(() => {
      setIsSuccessVisible(false);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [state.lastSavedValue, state.saveCount]);

  const status = isPending ? 'saving' : isSuccessVisible ? 'success' : 'idle';

  return (
    <section>
      <h2>Async save form</h2>

      <form ref={formRef} action={submit}>
        <label htmlFor="async-title">Название</label>

        <input
          id="async-title"
          name="title"
          type="text"
          placeholder="Введите значение"
          required
        />

        <button type="submit" disabled={isPending}>
          {isPending ? 'Saving…' : 'Сохранить'}
        </button>
      </form>

      <p aria-live="polite">
        {status === 'saving' && 'Saving…'}
        {status === 'success' && `Saved! (${state.lastSavedValue})`}
        {status === 'idle' && 'Idle'}
      </p>

      <small>Успешных сохранений: {state.saveCount}</small>
    </section>
  );
};
