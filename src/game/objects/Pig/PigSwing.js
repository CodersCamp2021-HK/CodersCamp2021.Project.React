import { BoxCollider, GameObject } from '../../engine';
import { Vector } from '../../shared';

const PIG_SWING_SIZE = new Vector(24, 32);

class PigSwing extends GameObject {
  /**
   * @param {{ attackCenter: Vector }} args
   */
  onActivate({ attackCenter }) {
    this.transform.origin = attackCenter ?? Vector.Zero;
    this.transform.width = PIG_SWING_SIZE.x;
    this.transform.height = PIG_SWING_SIZE.y;
    this.setCollider(BoxCollider, [PIG_SWING_SIZE]);
  }

  onUpdate() {
    this.destroy(this);
  }
}

export { PigSwing };
