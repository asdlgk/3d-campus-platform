// src/hooks/useTaskStatus.ts
import { useState, useEffect } from 'react';

interface TaskStatus {
  progress: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export function useWebSocket(url: string): TaskStatus {
  const [status, setStatus] = useState<TaskStatus>({
    progress: 0,
    status: 'pending'
  });

  useEffect(() => {
    const ws = new WebSocket(url);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatus({
        progress: data.progress,
        status: data.status
      });
    };

    return () => ws.close();
  }, [url]);

  return status;
}
