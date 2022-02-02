import { PIG_ATTACK_SIZE } from '../../config';
import { BoxCollider, GameObject } from '../../engine';
import { Vector } from '../../shared';

class PigSwing extends GameObject {
  /**
   * @param {{ attackCenter: Vector }} args
   */
  onActivate({ attackCenter }) {
    this.transform.origin = attackCenter ?? Vector.Zero;
    this.transform.width = PIG_ATTACK_SIZE.x;
    this.transform.height = PIG_ATTACK_SIZE.y;
    this.setCollider(BoxCollider, [PIG_ATTACK_SIZE]);
  }

  onUpdate() {
    this.destroy(this);
  }
}

export { PigSwing };
