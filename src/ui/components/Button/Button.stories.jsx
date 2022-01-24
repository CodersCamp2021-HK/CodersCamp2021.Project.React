import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    type: {
      options: ['silver', 'gold'],
    },
    onClick: { onclick },
  },
};

/** @type {typeof Button & Partial<{ args: object }>} */
const Template = Button;

export const Silver = Template.bind({});
Silver.args = {
  type: 'silver',
  children: 'Sterowanie',
};

export const Gold = Template.bind({});
Gold.args = {
  type: 'gold',
  children: 'start',
};
