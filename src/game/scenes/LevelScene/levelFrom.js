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
    }
  };
}

export { levelFrom };
