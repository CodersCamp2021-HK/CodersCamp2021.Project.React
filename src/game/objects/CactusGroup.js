import _ from 'lodash';
import { Vector2D } from '../shared';
import { GameObject } from '../engine/GameObject';
import { Cactus } from './Cactus';

class CactusGroup extends GameObject {
  #numOfCactus = _.random(1, 3);

  /**
   * @type {Cactus[]}
   */
  #cactus = [];

  activate() {
    let offset = Vector2D.Zero;
    for (let i = 0; i < this.#numOfCactus; ++i) {
      const cactus = this.create(Cactus, { args: { offset } });
      this.#cactus.push(cactus);
      offset = offset.setX(offset.x + cactus.width);
    }
  }

  onDestroy() {
    super.onDestroy();
    this.#cactus.forEach((x) => {
      this.destroy(x);
    });
  }
}

export { CactusGroup };
