// src/utils/websocket.ts
import { useTaskStore } from '../store/taskStore';

export const initWebSocket = () => {
  const ws = new WebSocket('wss://your-api-domain.com/ws');
  
  ws.onmessage = (event) => {
    const message: WebSocketMessage = JSON.parse(event.data);
    switch (message.type) {
      case 'statusUpdate':
        useTaskStore.getState().updateTask(message.data.taskId, {
          status: message.data.status
        });
        break;
      case 'progressUpdate':
        useTaskStore.getState().updateTask(message.data.taskId, {
          progress: message.data.progress
        });
        break;
    }
  };

  return ws;
};
