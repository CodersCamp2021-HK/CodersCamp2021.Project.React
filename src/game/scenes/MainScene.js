import { KingStatefull } from '../objects';
import { GameScene } from '../engine';

class MainScene extends GameScene {
  onActivate() {
    this.create(KingStatefull);
  }
}

export { MainScene };
