import { Vector } from './shared';

export const GRAVITY_VECTOR = new Vector(0, 0.2);
export const TILE_SIZE = 32;

export const KING_RUN_VELOCITY = 2;
export const KING_JUMP_IMPULSE = 6;
export const KING_AIR_HORIZONTAL_VELOCITY = 1;
export const KING_ATTACK_DELAY = 500;
export const KING_ATTACK_SIZE = new Vector(64, 48);
export const KING_DEFAULT_ANIMATION_INTERVAL = 10;
export const KING_ATTACK_ANIMATION_INTERVAL = 5;
export const KING_RESTITUTION = 0;
export const KING_RUN_ANIMATION_INTERVAL = 3;
export const KING_MAX_HP = 5;

export const PIG_RUN_VELOCITY = 1.5;
export const PIG_JUMP_IMPULSE = -5;
export const PIG_AIR_HORIZONTAL_VELOCITY = 0.5;
export const PIG_JUMP_THRESHOLD = 32;
export const PIG_ATTACK_SIZE = new Vector(16, 32);
export const PIG_ATTACK_OFFSET = 8;
export const PIG_ATTACK_RANGE = 12;
export const PIG_BASIC_MAX_HP = 2;
export const PIG_KING_MAX_HP = 10;
export const PIG_DETECTION_SIZE_HALF = new Vector(64, 32);
export const PIG_RESTITUTION = 0.1;
export const PIG_ANIMATION_INTERVAL = 10;
export const PIG_DEFAULT_ASSET_FACING = 'left';

export const DOOR_HITBOX_SIZE = 4;
export const DOOR_ANIMATION_INTERVAL = 10;
