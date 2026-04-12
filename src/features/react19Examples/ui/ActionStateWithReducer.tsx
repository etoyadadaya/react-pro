import { useActionState, useEffect, useRef, useState } from 'react';
import { actionInitialState } from '../model/constants';
import { submitWithReducer } from '../lib/submitWithReducer';

export const ActionStateWithReducer = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, submit, isPending] = useActionState(
    submitWithReducer,
    actionInitialState
  );

  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  useEffect(() => {
    if (!state.success) {
      return;
    }

    formRef.current?.reset();
    setIsSuccessVisible(true);

    const timer = window.setTimeout(() => {
      setIsSuccessVisible(false);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [state.success, state.submitCount]);

  return (
    <section>
      <h2>Action state with reducer (React 19)</h2>

      <form ref={formRef} action={submit}>
        <input name="firstName" placeholder="Имя" required />
        <input name="email" type="email" placeholder="Email" required />
        <textarea name="about" placeholder="О себе" required />

        <button type="submit" disabled={isPending}>
          {isPending ? 'Sending…' : 'Отправить'}
        </button>
      </form>

      <p aria-live="polite">
        {isPending && 'Submitting...'}
        {!isPending && isSuccessVisible && 'Saved successfully'}
        {!isPending && !isSuccessVisible && 'Idle'}
      </p>

      {state.success && (
        <pre>
          {JSON.stringify(
            {
              dirty: state.dirty,
              submitCount: state.submitCount,
              values: state.values,
            },
            null,
            2
          )}
        </pre>
      )}
    </section>
  );
};
