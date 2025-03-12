// src/components/TaskStatus/ProgressBar.tsx
import { useEffect } from 'react';
import { useWebSocket } from '../../hooks/useTaskStatus';

export default function ProgressBar() {
  const { progress, status } = useWebSocket('ws://api.yourdomain.com/ws/task-status');

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <div className="status-message">{status}</div>
    </div>
  );
}
