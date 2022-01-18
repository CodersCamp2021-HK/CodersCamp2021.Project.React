import { Background, DistanceUpdater, ObstaclesGenerator, TrexStatefull } from '../objects';
import { GameScene } from '../engine';

class MainScene extends GameScene {
  onActivate() {
    this.create(DistanceUpdater);
    this.create(Background);
    this.create(TrexStatefull);
    this.create(ObstaclesGenerator);
  }
}

export { MainScene };
