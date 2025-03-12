import { useEffect, useCallback } from 'react';

const useWebSocket = (url: string, onMessage: (data: any) => void) => {
  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    return () => ws.close();
  }, [url, onMessage]);
};

export default useWebSocket;
