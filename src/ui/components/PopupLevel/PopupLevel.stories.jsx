import React from 'react';
import { Button, PopupLevel } from '..';

export default {
  title: 'Components/PopupLevel',
  component: PopupLevel,
  parameters: {
    layout: 'fullscreen',
  },
};

export const VictoryPopup = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type='silver' onClick={handleOpen}>
        Controls
      </Button>
      <PopupLevel open={open} onClose={handleClose} variant='victory' />
    </>
  );
};

export const DefeatPopup = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type='silver' onClick={handleOpen}>
        Controls
      </Button>
      <PopupLevel open={open} onClose={handleClose} variant='defeat' />
    </>
  );
};

export const GameOverPopup = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type='silver' onClick={handleOpen}>
        Controls
      </Button>
      <PopupLevel open={open} onClose={handleClose} variant='gameOver' />
    </>
  );
};
