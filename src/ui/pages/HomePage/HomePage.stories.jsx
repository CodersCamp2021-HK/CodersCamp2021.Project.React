import { HomePage } from './HomePage';

export default {
  title: 'Pages/Home',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Home = () => <HomePage />;
