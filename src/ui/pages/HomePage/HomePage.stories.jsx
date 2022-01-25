import { HomePage } from './HomePage';

export default {
  title: 'Pages/Home Page',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Home = () => <HomePage />;
