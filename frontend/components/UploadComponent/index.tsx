// src/components/UploadComponent/index.tsx
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { chunkedUpload } from '../../utils/chunkedUpload';
import styles from './style.module.css';

interface Props {
  onUploadSuccess: (task: Task) => void;
}

export default function UploadComponent({ onUploadSuccess }: Props) {
  const onDrop = useCallback(async (files: File[]) => {
    const file = files;
    if (!file) return;

    // 分片上传逻辑
    const task = await chunkedUpload(file, {
      chunkSize: 5 * 1024 * 1024, // 5MB
      onProgress: (progress) => console.log(`Uploading: ${progress}%`),
    });
    
    onUploadSuccess(task);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': ['.jpg', '.png']},
    multiple: false
  });

  return (
    <div {...getRootProps()} className={styles.dropzone}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <p>Drag & drop campus image, or click to select</p>
      )}
    </div>
  );
}
