import { LevelScene } from './LevelScene';

/**
 * Generate an anonymous level class from level info.
 *
 * @param {import('./LevelScene').LevelInfo} levelInfo
 * @returns {typeof LevelScene} level information
 */
function levelFrom(levelInfo) {
  return class extends LevelScene {
    /**
     * @param {import('../../engine/GameEngine').Services} services
     */
    constructor(services) {
      super(services, levelInfo);
    }
  };
}

export { levelFrom };
