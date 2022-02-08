import { CanvasRenderingContext2D } from 'canvas';
import { UIProxy } from '../../shared';
import { GameEngine } from './GameEngine';
import { scenes } from '../scenes';

const createGameEngine = () => {
  const canvas = document.createElement('canvas');
  const ui = new UIProxy(() => {});
  return new GameEngine(canvas, ui, scenes);
};

/**
 * @param {number} ms
 */
const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

describe('GameEngine', () => {
  it('can load a level', () => {
    const gameEngine = createGameEngine();

    gameEngine.load('level1');

    expect(gameEngine.scene).toBe('level1');
  });

  it('does render for first few seconds', async () => {
    jest.spyOn(CanvasRenderingContext2D.prototype, 'drawImage').mockImplementation(() => {});
    await expect(
      (async () => {
        const gameEngine = createGameEngine();
        gameEngine.load('level1').start();

        await wait(2500);

        gameEngine.stop();
      })(),
    ).resolves.not.toThrow();
  });
});
