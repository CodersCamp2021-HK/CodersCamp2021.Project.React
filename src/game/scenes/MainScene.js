import { King } from '../objects';
import { GameScene } from '../engine';

class MainScene extends GameScene {
  onActivate() {
    this.create(King);
  }
}

export { MainScene };
