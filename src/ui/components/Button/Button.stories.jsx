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

export const Primary = Template.bind({});
Primary.args = {
  type: 'silver',
  children: 'Sterowanie',
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'gold',
  children: 'start',
};
