import { useEffect, useRef } from 'react';

interface WebSocketLoggerProps {
  url: string;
}

export const WebSocketLogger = ({ url }: WebSocketLoggerProps) => {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onmessage = (event) => {
      console.log('сообщение ws:', event.data);
    };

    wsRef.current.onerror = (event) => {
      console.log('ошибка ws:', event);
    };

    return () => {
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [url]);

  return null;
};
