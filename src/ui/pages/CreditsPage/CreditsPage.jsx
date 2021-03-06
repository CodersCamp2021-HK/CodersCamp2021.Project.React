import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { theme } from '../../../shared/theme';
import { PageHeader, Button, BUTTON_WIDTH_SIZE, BUTTON_HEIGHT_SIZE, DevInfo } from '../../components';
import backgroundUrl from '../../../public/img/background.jpg';
import mmUrl from '../../../public/img/mm_pixel.png';
import jsUrl from '../../../public/img/js_pixel.png';
import tcUrl from '../../../public/img/tc_pixel.png';
import kdUrl from '../../../public/img/kd_pixel.png';
import hkUrl from '../../../public/img/hk_pixel.png';
import logoUrl from '../../../public/img/coderscamp_logo.png';

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
  position: relative;
  max-width: max(70vw, 850px);
  border: 1rem solid ${theme.colors.primary.main};
  background: ${theme.colors.background.transparent};
`;

const infoContainer = css`
  margin: 1.85rem 2.54rem 3.54rem 2.54rem;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 576px) {
    flex-direction: column;
  }
`;

const info = css`
  :not(:last-child) {
    margin-right: 1rem;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 576px) {
    :not(:last-child) {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
`;

const thanks = css`
  :not(:last-child) {
    margin-bottom: 0.5rem;
  }
  font-family: ${theme.fontFamily.primary};
  line-height: 1.6;

  h2 {
    -webkit-text-stroke: 0.04rem ${theme.colors.text.secondary2};
  }
  img {
    margin: 0.5rem 0;
  }
  a {
    color: ${theme.colors.primary.main};
    text-decoration: underline;
  }
`;

const buttonWrapper = css`
  position: absolute;
  width: ${BUTTON_WIDTH_SIZE};
  margin-left: auto;
  margin-right: auto;
  bottom: calc(-${BUTTON_HEIGHT_SIZE} / 2 - 1rem);
  left: 0;
  right: 0;
`;

const CreditsPage = () => {
  return (
    <main css={wrapper}>
      <PageHeader>Credits</PageHeader>
      <section css={credits}>
        <div css={infoContainer}>
          <div css={info}>
            <DevInfo image={mmUrl} name='Marta Mejer' devRole='Tech lead, Programmer' />
            <DevInfo image={jsUrl} name='Justyna Skrajna' devRole='Game designer, Programmer' />
            <DevInfo image={tcUrl} name='Tomasz Chojnacki' devRole='Project manager, Programmer' />
            <DevInfo image={kdUrl} name='Kamil Dudek' devRole='Scrum master, Programmer' />
          </div>
          <div css={info}>
            <DevInfo image={hkUrl} name='Hubert Kawa??ek' devRole='Game coordinator, Programmer' special />
            <div css={thanks}>
              <h2>Special thanks to</h2>
              <img src={logoUrl} alt='Coders Camp Logo' />
              <p>for learning experience</p>
            </div>
            <div css={thanks}>
              <h2>Many thanks to assets author</h2>
              <a href='https://pixelfrog-assets.itch.io/kings-and-pigs' target='_blank' rel='noreferrer'>
                Author&apos;s page
              </a>
              <br />
              <a
                href='https://github.com/CodersCamp2021-HK/CodersCamp2021.Project.React'
                target='_blank'
                rel='noreferrer'
              >
                Repository page
              </a>
            </div>
          </div>
        </div>
        <div css={buttonWrapper}>
          <Link to='/'>
            <Button type='silver'>go back to homepage</Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export { CreditsPage };
