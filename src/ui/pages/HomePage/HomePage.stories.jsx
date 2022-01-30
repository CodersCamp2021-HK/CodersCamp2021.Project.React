import { MemoryRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

export default {
  title: 'Pages/Home',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Home = () => (
  <MemoryRouter>
    <HomePage />
  </MemoryRouter>
);
