import * as React from 'react';
import ReactDOM from 'react-dom';
import { css } from '@emotion/react';

const popupContainer = css({
  width: '70vw',
  height: '80vh',
  border: '1px black solid',
  padding: '5px 15px',
  '&:hover': {
    background: '#e1e1e1',
  },
});

const Popup = ({ open, onClose, children }) => {
  if (!open) return null;

  const portal = document.createElement('div');
  portal.setAttribute('id', 'portal');
  document.querySelector('body')?.append(portal);

  return ReactDOM.createPortal(
    <div css={popupContainer}>
      <button onClick={onClose}>close</button>
      <div>{children}</div>
    </div>,
    document.getElementById('portal'),
  );
};

export { Popup };
