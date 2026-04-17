import { useRef, type FocusEvent } from 'react';

export const FocusTracker = () => {
  const focusRef = useRef(0);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const secondInputRef = useRef<HTMLInputElement | null>(null);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (!event.relatedTarget) {
      return;
    }

    const isFromFirstInput = event.relatedTarget === firstInputRef.current;
    const isFromSecondInput = event.relatedTarget === secondInputRef.current;

    if (isFromFirstInput || isFromSecondInput) {
      focusRef.current += 1;
    }
  };

  const focusFirstInput = () => {
    firstInputRef.current?.focus();
  };

  return (
    <div>
      <input
        ref={firstInputRef}
        type="text"
        onFocus={handleFocus}
        placeholder="первое поле"
      />

      <input
        ref={secondInputRef}
        type="text"
        onFocus={handleFocus}
        placeholder="второе поле"
      />

      <button onClick={focusFirstInput}>фокус на первое поле</button>
    </div>
  );
};
