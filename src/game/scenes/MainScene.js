import { Terrain } from '../objects';
import { GameScene } from '../engine/GameScene';

const map = `
XXXXXXXXXXXXXX
XXXX.........X
XXXXX......X.X
X............X
X............X
X......XXX...X
X..S...XXX.E.X
XXXXXXXXXXXXXX
`;

class MainScene extends GameScene {
  activate() {
    this.createGameObject(Terrain, { args: { map } });
    // this.createGameObject(DistanceUpdater);
    // this.createGameObject(Background);
    // this.createGameObject(Trex);
    // this.createGameObject(ObstaclesGenerator);
  }
}

export { MainScene };
