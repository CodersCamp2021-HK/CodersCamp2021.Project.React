import { LevelScene } from './LevelScene';

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
        levelInfo.additionalObjects(this.create.bind(this));
      }
    }
  };
}

export { levelFrom };
