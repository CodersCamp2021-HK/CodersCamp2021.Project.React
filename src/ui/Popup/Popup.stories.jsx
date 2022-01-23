import React from 'react';
import { Popup } from './Popup';

export default {
  title: 'Component/Popup',
  component: Popup,
  parameters: {
    layout: 'fullscreen',
  },
};

export const PopupContainer = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpen}>open modal</button>
      <Popup open={open} onClose={handleClose}>
        inner
      </Popup>
    </div>
  );
};
