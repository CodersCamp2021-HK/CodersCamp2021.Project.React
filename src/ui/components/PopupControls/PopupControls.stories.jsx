import React from 'react';
import { Button, PopupControls } from '..';

export default {
  title: 'Components/PopupControls',
  component: PopupControls,
  parameters: {
    layout: 'fullscreen',
  },
};

export const PopupWithButton = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type='silver' onClick={handleOpen}>
        Controls
      </Button>
      <PopupControls open={open} onClose={handleClose} />
    </div>
  );
};
