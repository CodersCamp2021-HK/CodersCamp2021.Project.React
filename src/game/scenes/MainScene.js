import { Background, DistanceUpdater, ObstaclesGenerator, TrexStatefull } from '../objects';
import { GameScene } from '../engine/GameScene';

class MainScene extends GameScene {
  activate() {
    this.createGameObject(DistanceUpdater);
    this.createGameObject(Background);
    this.createGameObject(TrexStatefull);
    this.createGameObject(ObstaclesGenerator);
  }
}

export { MainScene };
