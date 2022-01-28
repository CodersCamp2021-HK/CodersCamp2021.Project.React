import React from 'react';
import { css } from '@emotion/react';
import { theme } from '../../../shared/theme';
import { PageHeader, Button, BUTTON_WIDTH_SIZE } from '../../components';
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

const creditsWrapper = css`
  position: relative;
  width: 100%;
  max-width: max(min(50vw, 1000px), 500px);
  max-height: 50vh;
`;

const credits = css`
  overflow-y: auto;
  border: 1rem solid ${theme.colors.primary.main};
  background: ${theme.colors.background.transparent};
`;

const buttonWrapper = css`
  position: absolute;
  width: ${BUTTON_WIDTH_SIZE};
  margin-left: auto;
  margin-right: auto;
  bottom: -${4.8 / 2}rem;
  left: 0;
  right: 0;
`;

const CreditsPage = () => {
  return (
    <main css={wrapper}>
      <PageHeader>Credits</PageHeader>
      <div css={creditsWrapper}>
        <section css={credits}>
          <div css={buttonWrapper}>
            <Button type='silver' onClick={() => {}}>
              homepage
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};

export { CreditsPage };
