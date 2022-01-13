import _ from 'lodash';
import { Bird } from './Bird';
import { Cactus } from './Cactus';
import { GameObject } from '../engine/GameObject';

function getNextObstacleAfterCount() {
  return _.random(90, 120);
}

class ObstaclesGenerator extends GameObject {
  #frameCount = 0;

  #nextObstacleAfter = getNextObstacleAfterCount();

  update() {
    this.#frameCount += 1;
    if (this.#frameCount === this.#nextObstacleAfter) {
      this.#createRandomObstacle();
      this.#frameCount = 0;
      this.#nextObstacleAfter = getNextObstacleAfterCount();
    }
  }

  #createRandomObstacle() {
    const Cls = _.random() === 0 ? Bird : Cactus;
    this.create(Cls);
  }
}

export { ObstaclesGenerator };
