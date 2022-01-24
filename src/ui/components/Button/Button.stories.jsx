import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    type: {
      options: ['primary', 'secondary'],
    },
    onClick: {
      action: 'secondary',
    },
  },
};

/** @type {typeof Button & Partial<{ args: object }>} */
const Template = Button;

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  children: 'sterowanie',
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  children: 'sterowanie',
};
