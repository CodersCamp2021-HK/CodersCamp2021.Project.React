import { LevelScene } from './LevelScene';
import { Vector } from '../../shared';
import { TILE_SIZE } from '../../config';

/**
 * Generate an anonymous level class from level info.
 *
 * @param {import('./LevelScene').LevelInfo} levelInfo
 * @returns {typeof LevelScene} level information
 */
function levelFrom(levelInfo) {
  return class extends LevelScene {
    onActivate() {
      super.initialize(levelInfo);

      if (levelInfo.additionalObjects) {
        levelInfo.additionalObjects((Cls, pos, otherArgs = {}) => {
          this.create(Cls, {
            args: {
              initialPos: pos.add(new Vector(0.5, 0.5)).scale(TILE_SIZE),
              level: this,
              ...otherArgs,
            },
          });
        });
      }
    }
  };
}

export { levelFrom };
