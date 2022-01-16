import _ from 'lodash';
import { Bird } from './Bird';
import { GameObject } from '../engine/GameObject';
import { CactusGroup } from './CactusGroup';

const SPEEDUP_FRAMES_COUNT = 5 * 60;
const MAX_SPEEDUP = 60;

class ObstaclesGenerator extends GameObject {
  #frameCount = 0;

  #speedupFrameCount = 0;

  #speed = 0;

  #nextObstacleAfter = this.#getNextObstacleAfterCount();

  update() {
    this.#frameCount += 1;
    this.#speedupFrameCount += 1;
    if (this.#speed < MAX_SPEEDUP && this.#speedupFrameCount === SPEEDUP_FRAMES_COUNT) {
      this.#speed += 1;
      this.#speedupFrameCount = 0;
    }
    if (this.#frameCount === this.#nextObstacleAfter) {
      this.#createRandomObstacle();
      this.#frameCount = 0;
      this.#nextObstacleAfter = this.#getNextObstacleAfterCount();
    }
  }

  #createRandomObstacle() {
    if (_.random() === 0) {
      this.create(CactusGroup);
      return;
    }
    this.create(Bird);
  }

  #getNextObstacleAfterCount() {
    return _.random(90 - this.#speed, 120 - this.#speed);
  }
}

export { ObstaclesGenerator };
