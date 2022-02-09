import React from 'react';
import { MemoryRouter } from 'react-router-dom';
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
      <MemoryRouter>
        <PopupLevel open={open} onClose={handleClose} variant='victory' path='/' nextLevel={0} />
      </MemoryRouter>
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
      <MemoryRouter>
        <PopupLevel open={open} onClose={handleClose} variant='defeat' path='/' nextLevel={0} />
      </MemoryRouter>
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
      <MemoryRouter>
        <PopupLevel open={open} onClose={handleClose} variant='gameOver' path='/' nextLevel={0} />
      </MemoryRouter>
    </>
  );
};
