declare module '*.css';

type TaskItem = {
  taskId: string;
  fileName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  modelUrl?: string;
};

type WebSocketMessage = {
  type: 'statusUpdate' | 'progressUpdate' | 'error';
  data: TaskItem;
};

type ModelViewerProps = {
  modelUrl: string;
  fileType: 'glb' | 'gltf' | 'obj';
};

type APIResponse<T = any> = {
  code: number;
  message: string;
  data: T;
};
