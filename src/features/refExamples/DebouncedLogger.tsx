import { useEffect, useRef, type ChangeEvent } from 'react';

export const DebouncedLogger = () => {
  const timerRef = useRef<number | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      console.log(`дебаунс значение: ${nextValue}`);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <input type="text" onChange={handleChange} placeholder="введите текст" />
  );
};
