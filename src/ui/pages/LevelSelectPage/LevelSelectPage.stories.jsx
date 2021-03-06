import { MemoryRouter } from 'react-router-dom';
import { LevelSelectPage } from './LevelSelectPage';

export default {
  title: 'Pages/Level Select',
  component: LevelSelectPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export const LevelSelect = () => (
  <MemoryRouter>
    <LevelSelectPage />
  </MemoryRouter>
);
