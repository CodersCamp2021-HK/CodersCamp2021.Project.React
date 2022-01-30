import { MemoryRouter } from 'react-router-dom';
import { CreditsPage } from './CreditsPage';

export default {
  title: 'Pages/Credits',
  component: CreditsPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Credits = () => (
  <MemoryRouter>
    <CreditsPage />
  </MemoryRouter>
);
