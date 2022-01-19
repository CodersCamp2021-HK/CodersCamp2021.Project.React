import { LevelScene } from './LevelScene';

/**
 * @param {import('./LevelScene').LevelInfo} levelInfo
 * @returns {typeof LevelScene}
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
