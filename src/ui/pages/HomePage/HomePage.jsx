import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { theme } from '../../../shared/theme';
import { PageHeader, Button, PopupControls } from '../../components';
import backgroundUrl from '../../../public/img/background.jpg';

const wrapper = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: ${theme.colors.background.solid} url(${backgroundUrl}) center center / cover;
`;

const btnGroup = css`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-top: 3rem;
  gap: 3rem;
`;
const HomePage = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <main css={wrapper}>
      <PageHeader>King and Pigs</PageHeader>
      <section css={btnGroup}>
        <Link to='/level-select'>
          <Button type='gold' onClick={() => {}}>
            start
          </Button>
        </Link>
        <Button type='silver' onClick={handleOpen}>
          Controls
        </Button>
        <Link to='/credits'>
          <Button type='silver' onClick={() => {}}>
            Credits
          </Button>
        </Link>
        <PopupControls open={open} onClose={handleClose} />
      </section>
    </main>
  );
};

export { HomePage };
