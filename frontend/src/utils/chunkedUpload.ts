// src/utils/chunkedUpload.ts
import axios from 'axios';

interface ChunkedUploadOptions {
  chunkSize: number;
  onProgress?: (progress: number) => void;
}

export async function chunkedUpload(file: File, options: ChunkedUploadOptions): Promise<Task> {
  const totalChunks = Math.ceil(file.size / options.chunkSize);
  const uploadId = Date.now().toString();
  
  // 并行上传所有分片
  const uploadPromises = [];
  for (let i = 0; i < totalChunks; i++) {
    const chunk = file.slice(i * options.chunkSize, (i + 1) * options.chunkSize);
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('chunkIndex', i.toString());
    formData.append('totalChunks', totalChunks.toString());
    formData.append('uploadId', uploadId);
    
    uploadPromises.push(
      axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    );
  }

  await Promise.all(uploadPromises);
  
  // 通知后端合并文件
  const { data: task } = await axios.post('/api/merge', {
    uploadId,
    fileName: file.name,
    contentType: file.type,
  });

  return task;
}
