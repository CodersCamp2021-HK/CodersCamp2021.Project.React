import _ from 'lodash';
import { GameObject } from '../engine/GameObject';
import { AssetsManager } from '../assets';
import { Vector2D } from '../shared';

/**
 * @typedef {import('../shared').Sprite} CactusSprite
 */

const SPEED = 3;
const BACKGROUND_OFFSET = 10;

function randomizeCactusSprites() {
  const numOfCactus = _.random(1, 4);
  const large = _.random(0, numOfCactus);
  const small = numOfCactus - large;
  const smallSprites = _.sampleSize(AssetsManager.cactusSmall, small);
  const largeSprites = _.sampleSize(AssetsManager.cactusLarge, large);
  const sprites = _.shuffle(smallSprites.concat(largeSprites));
  let distance = 0;
  const vectors = sprites.map((x) => {
    const vec = new Vector2D(distance, -x.height);
    distance += x.width;
    return vec;
  });
  return /** @type {[CactusSprite, Vector2D][]} */ (_.zip(sprites, vectors));
}

class Cactus extends GameObject {
  #sprites = randomizeCactusSprites();

  #spritesWidth = _.sum(this.#sprites.map(([_s, v]) => v.x));

  #offset = Vector2D.Zero;

  update(/** @type {import('../shared/Frame').Frame} */ frame) {
    const position = new Vector2D(
      frame.buffer.width + this.#sprites[0][0].width,
      frame.buffer.height - BACKGROUND_OFFSET,
    );
    this.#offset = this.#offset.setX(this.#offset.x - SPEED);
    if (this.#offset.x < -(frame.buffer.width + this.#sprites[0][0].width + this.#spritesWidth)) {
      this.destroy(this);
    }
    this.#sprites.forEach(([s, v]) => {
      frame.buffer.draw(position.add(v).add(this.#offset), s);
    });
  }
}

export { Cactus };
