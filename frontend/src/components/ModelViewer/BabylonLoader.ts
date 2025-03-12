// src/components/ModelViewer/BabylonLoader.ts
import * as BABYLON from '@babylonjs/core/Legacy/legacy';

export class BabylonLoader {
  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new BABYLON.Engine(canvas, true);
    this.scene = new BABYLON.Scene(this.engine);
    this.setupLighting();
  }

  private setupLighting() {
    new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);
    new BABYLON.ArcRotateCamera('camera1', 0, 0, 10, BABYLON.Vector3.Zero(), this.scene)
      .attachControl(this.canvas, true);
  }

  public async loadModel(url: string) {
    await BABYLON.SceneLoader.AppendAsync(url, '', this.scene);
    this.engine.runRenderLoop(() => this.scene.render());
  }

  public dispose() {
    this.scene.dispose();
    this.engine.dispose();
  }
}
