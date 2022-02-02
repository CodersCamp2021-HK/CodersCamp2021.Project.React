import { AssetsManager } from '../assets';
import { DOOR_ANIMATION_INTERVAL, DOOR_HITBOX_SIZE, TILE_SIZE } from '../config';
import { BoxCollider, GameObject } from '../engine';
import { Vector } from '../shared';

class Door extends GameObject {
  /** @type {'start' | 'end'} */
  #type = 'start';

  /**
   * @param {Object} props
   * @param {'start' | 'end'} props.type
   * @param {Vector} props.position
   */
  onActivate({ type, position }) {
    this.#type = type;
    this.transform.width = 46;
    this.transform.height = 56;
    this.transform.origin = position.add(new Vector(TILE_SIZE / 2, TILE_SIZE - 28));

    if (this.#type === 'start') {
      this.animation.reset(DOOR_ANIMATION_INTERVAL, AssetsManager.door.close, true);
    } else {
      this.animation.reset(DOOR_ANIMATION_INTERVAL, AssetsManager.door.normal);
      this.setCollider(BoxCollider, [
        new Vector(DOOR_HITBOX_SIZE, DOOR_HITBOX_SIZE),
        new Vector((this.transform.width - DOOR_HITBOX_SIZE) / 2, this.transform.height - DOOR_HITBOX_SIZE),
      ]);
    }
  }

  open() {
    this.animation.reset(DOOR_ANIMATION_INTERVAL, AssetsManager.door.open, true);
  }
}

export { Door };
