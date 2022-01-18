import { LevelMap } from '../objects';
import { GameScene } from '../engine/GameScene';

/**
 * @todo Store maps in separate files together with level logic
 */
const map = `
XXXXXXXXXXXXXX
XX.X.........X
XXXXXXX....X.X
X.....X......X
X............X
X............X
X.....XXXX...X
X..S...XXX.E.X
XXXXXXXXXXXXXX
`;

class MainScene extends GameScene {
  activate() {
    this.createGameObject(LevelMap, { args: { map } });
  }
}

export { MainScene };
