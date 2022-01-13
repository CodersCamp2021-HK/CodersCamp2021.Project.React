import { Background, DistanceUpdater, ObstaclesGenerator, Trex } from '../objects';
import { GameScene } from '../engine/GameScene';

class MainScene extends GameScene {
  activate() {
    this.createGameObject(DistanceUpdater, { args: { UI: this.proxy.ui } });
    this.createGameObject(Background);
    this.createGameObject(Trex, { args: { keyboard: this.proxy.keyboardInput } });
    this.createGameObject(ObstaclesGenerator);
  }
}

export { MainScene };
