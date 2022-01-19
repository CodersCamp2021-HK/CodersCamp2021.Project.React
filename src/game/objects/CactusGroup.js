import _ from 'lodash';
import { Vector } from '../shared';
import { GameObject } from '../engine';
import { Cactus } from './Cactus';

class CactusGroup extends GameObject {
  #numOfCactus = _.random(1, 3);

  /**
   * @type {Cactus[]}
   */
  #cactus = [];

  onActivate() {
    let offset = Vector.Zero;
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
