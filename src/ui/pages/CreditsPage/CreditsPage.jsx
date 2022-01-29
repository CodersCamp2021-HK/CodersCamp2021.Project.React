import { css } from '@emotion/react';
import { theme } from '../../../shared/theme';
import { PageHeader, Button, BUTTON_WIDTH_SIZE, BUTTON_HEIGHT_SIZE, DevInfo } from '../../components';
import backgroundUrl from '../../../public/img/background.jpg';
import mmUrl from '../../../public/img/mm_pixel.png';
import jsUrl from '../../../public/img/js_pixel.png';
import tcUrl from '../../../public/img/tc_pixel.png';
import kdUrl from '../../../public/img/kd_pixel.png';
import hkUrl from '../../../public/img/hk_pixel.png';

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
  height: 100%;
  max-width: max(70vw, 850px);
`;

const credits = css`
  overflow-y: auto;
  border: 1rem solid ${theme.colors.primary.main};
  background: ${theme.colors.background.transparent};
`;

const infoContainer = css`
  margin: 1.85rem 2.54rem 3.54rem 2.54rem;
  display: flex;
  justify-content: space-between;
`;

const buttonWrapper = css`
  position: absolute;
  width: ${BUTTON_WIDTH_SIZE};
  margin-left: auto;
  margin-right: auto;
  bottom: calc(-${BUTTON_HEIGHT_SIZE} / 2);
  left: 0;
  right: 0;
`;

const CreditsPage = () => {
  return (
    <main css={wrapper}>
      <PageHeader>Credits</PageHeader>
      <div css={creditsWrapper}>
        <section css={credits}>
          <div css={infoContainer}>
            <div>
              <DevInfo image={mmUrl} name='Marta Mejer' devRole='Tech lead, Programmer' />
              <DevInfo image={jsUrl} name='Justyna Skrajna' devRole='Game designer, Programmer' />
              <DevInfo image={tcUrl} name='Tomasz Chojnacki' devRole='Project manager, Programmer' />
              <DevInfo image={kdUrl} name='Kamil Dudek' devRole='Scrum master, Programmer' />
            </div>
            <div>
              <DevInfo image={hkUrl} name='Hubert Kawałek' devRole='Game coordinator, Programmer' />
            </div>
          </div>
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
