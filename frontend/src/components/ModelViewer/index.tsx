import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight } from '@babylonjs/core';
import BabylonLoader from './BabylonLoader';

const ModelViewer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { modelId } = useParams<{ modelId: string }>();

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    
    // 初始化场景
    const camera = new ArcRotateCamera(
      'camera', 
      -Math.PI / 2, 
      Math.PI / 2.5, 
      3, 
      Vector3.Zero(), 
      scene
    );
    camera.attachControl(canvasRef.current, true);
    
    new HemisphericLight('light', Vector3.Up(), scene);

    // 加载模型
    BabylonLoader.loadModel(scene, modelId!).then(() => {
      engine.runRenderLoop(() => scene.render());
    });

    return () => {
      scene.dispose();
      engine.dispose();
    };
  }, [modelId]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ModelViewer;
