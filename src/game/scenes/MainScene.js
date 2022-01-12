import { Trex } from '../objects';
import { GameScene } from '../engine/GameScene';

class MainScene extends GameScene {
  activate() {
    this.createGameObject(Trex);
  }
}

export { MainScene };
