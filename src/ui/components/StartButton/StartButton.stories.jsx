import { StartButton } from './StartButton';

export default {
  title: 'Components/StartButton',
  component: StartButton,
  argTypes: {
    type: {
      options: ['primary', 'secondary'],
    },
    onClick: {
      action: 'secondary',
    },
  },
};

/** @type {typeof StartButton & Partial<{ args: object }>} */
const Template = StartButton;

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  children: 'Start',
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  children: 'Start',
};
