import { Heart } from './Heart';
import { Vector } from '../shared';
import { GameObject } from '../engine';

class HeartList extends GameObject {
  /**
   * @param {number} hp
   */
  createHeartList(hp) {
    console.log(`create list with ${hp} hearts`);
    let start = 0;
    for (let i = 0; i < hp; i++) {
      this.create(Heart, { args: { initialPos: new Vector(start, 0) } });
      start += 15;
    }
  }
}

export { HeartList };
