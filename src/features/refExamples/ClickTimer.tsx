import { useRef } from 'react';

interface ClickData {
  startTime: number | null;
  clickCount: number;
}

export const ClickTimer = () => {
  const dataRef = useRef<ClickData>({
    startTime: null,
    clickCount: 0,
  });

  const handleClick = () => {
    const now = Date.now();

    if (dataRef.current.startTime === null) {
      dataRef.current.startTime = now;
    }

    dataRef.current.clickCount += 1;

    const diffMs = now - dataRef.current.startTime;

    console.log(
      `Прошло ${diffMs} мс с первого клика. Всего кликов: ${dataRef.current.clickCount}`
    );
  };

  return <button onClick={handleClick}>клик</button>;
};
