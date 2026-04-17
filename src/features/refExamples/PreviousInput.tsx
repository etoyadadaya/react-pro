import { useEffect, useRef, useState, type ChangeEvent } from 'react';

export const PreviousInput = () => {
  const prevRef = useRef('');

  const [value, setValue] = useState('');
  const [prevValue, setPrevValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((currentValue) => {
      prevRef.current = currentValue;
      setPrevValue(currentValue);

      return event.target.value;
    });
  };

  useEffect(() => {
    prevRef.current = value;
  }, [value]);

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
      <p>предыдущее значение: {prevValue || '—'}</p>
    </div>
  );
};
