import React from 'react';
import { css } from '@emotion/react';
import { theme } from '../../../shared/theme';
import { PageHeader, Button } from '../../components';
import backgroundUrl from '../../../public/img/background.jpg';

const wrapper = css`
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: ${theme.colors.background.solid} url(${backgroundUrl}) center center / cover;
`;

const credits = css`
  width: 100%;
  max-width: max(min(50vw, 1000px), 500px);
  max-height: 50vh;
  overflow-y: auto;
  border: 1rem solid ${theme.colors.primary.main};
  background: ${theme.colors.background.transparent};
  z-index: 100;
`;

const CreditsPage = () => {
  return (
    <main css={wrapper}>
      <PageHeader>Credits</PageHeader>
      <section css={credits} />
    </main>
  );
};

export { CreditsPage };
