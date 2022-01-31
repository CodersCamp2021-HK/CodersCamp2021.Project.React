import { MemoryRouter } from 'react-router-dom';
import { NotFound } from '.';

export default {
  title: 'Pages/Not Found',
  component: NotFound,
  parameters: {
    layout: 'fullscreen',
  },
};

export const NotFoundPage = () => (
  <MemoryRouter>
    <NotFound />
  </MemoryRouter>
);
