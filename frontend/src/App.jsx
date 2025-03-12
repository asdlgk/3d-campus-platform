// src/App.tsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import UploadComponent from './components/UploadComponent';
import ModelViewer from './components/ModelViewer';
import Navbar from './components/Navbar';
import { Task } from './types/types';

export default function App() {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <UploadComponent 
            onUploadSuccess={(task) => setActiveTask(task)}
          />
        }/>
        <Route path="/viewer" element={
          activeTask && <ModelViewer gltfUrl={activeTask.modelUrl} />
        }/>
      </Routes>
    </div>
  );
}

