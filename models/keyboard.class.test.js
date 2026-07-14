import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { Keyboard } from './keyboard.class';

describe('Keyboard class', () => {
  beforeAll(() => {
    document.body.innerHTML = `
        <button id="btnLeft"></button>
        <button id="btnRight"></button>
        <button id="btnJump"></button>
        <button id="btnThrow"></button>
    `;
  });

  afterAll(() => {
    document.body.innerHTML = '';
  });

  test('Keyboard is been exposed to window', () => {
    new Keyboard();
    expect(window.Keyboard).toBeDefined();
  });

  /**
   * One landmine to watch for: KeyboardEvent's keyCode is a legacy,
   * technically-read-only property — jsdom usually honors it when passed in the constructor init dict,
   * but if you find event.keyCode always reads 0 in a test, that's why;
   * you'd need Object.defineProperty(event, 'keyCode', { get: () => 39 }) as a workaround.
   */
  test.for([
    { keyCode: 37, flag: 'LEFT' },
    { keyCode: 38, flag: 'UP' },
    { keyCode: 39, flag: 'RIGHT' },
    { keyCode: 40, flag: 'DOWN' },
    { keyCode: 32, flag: 'SPACE' },
  ])(
    'Dispatching keydown/keyup on window with the keyCode $keyCode toggles $flag correctly',
    ({ keyCode, flag }) => {
      const keyboard = new Keyboard();

      const keyDownEvent = new KeyboardEvent('keydown', { keyCode });
      window.dispatchEvent(keyDownEvent);
      expect(keyboard[flag]).toBe(true);

      const keyUpEvent = new KeyboardEvent('keyup', { keyCode });
      window.dispatchEvent(keyUpEvent);
      expect(keyboard[flag]).toBe(false);
    }
  );

  // TouchEvent has no native constructor in desktop Firefox by default (jsdom fakes it; Chromium/WebKit implement it) — see PROGRESS.md backlog.
  test.skipIf(typeof TouchEvent === 'undefined').for([
    { btnId: 'btnLeft', flag: 'LEFT' },
    { btnId: 'btnRight', flag: 'RIGHT' },
    { btnId: 'btnJump', flag: 'SPACE' },
    { btnId: 'btnThrow', flag: 'D' }, // btnThrow has extra spam-guard logic in Keyboard, but a fresh instance's first touch cycle still satisfies it
  ])(
    'Dispatching touchstart/touchend on $btnId toggles $flag',
    ({ btnId, flag }) => {
      const keyboard = new Keyboard();
      const btn = document.getElementById(btnId);

      btn.dispatchEvent(new TouchEvent('touchstart'));
      expect(keyboard[flag]).toBe(true);
      btn.dispatchEvent(new TouchEvent('touchend'));
      expect(keyboard[flag]).toBe(false);
    }
  );
});
