import { memo, forwardRef, useMemo, useLayoutEffect } from 'react';
import * as ReactDOM from 'react-dom';

/**
 * @template T
 * @param {React.ForwardedRef<T>} ref
 * @param {T} value
 */
function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    // eslint-disable-next-line no-param-reassign
    ref.current = value;
  }
}

const GameCanvas = memo(
  forwardRef((_, ref) => {
    const canvas = useMemo(() => {
      const elem = document.createElement('canvas');
      elem.width = 500;
      elem.height = 200;
      elem.style.border = '1px black solid';
      elem.id = 'GameCanvas';
      return elem;
    }, []);

    useLayoutEffect(() => {
      document.body.appendChild(canvas);
      setRef(ref, canvas);
      return () => {
        setRef(ref, undefined);
        canvas.remove();
      };
    }, [ref, canvas]);

    return ReactDOM.createPortal(null, canvas, 'GameCanvas');
  }),
);

GameCanvas.displayName = 'GameCanvas';

export { GameCanvas };
