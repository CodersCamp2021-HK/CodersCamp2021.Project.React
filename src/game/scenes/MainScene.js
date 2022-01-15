import { Background, DistanceUpdater, ObstaclesGenerator, Trex } from '../objects';
import { GameScene } from '../engine/GameScene';

class MainScene extends GameScene {
  activate() {
    this.createGameObject(DistanceUpdater);
    this.createGameObject(Background);
    this.createGameObject(Trex);
    this.createGameObject(ObstaclesGenerator);
  }
}

export { MainScene };
