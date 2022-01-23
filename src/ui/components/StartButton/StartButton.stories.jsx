import { StartButton } from './StartButton';

export default {
  title: 'Components/StartButton',
  component: StartButton,
  argTypes: {
    type: {
      options: ['normal', 'selected'],
    },
    onSelect: {
      action: 'selected',
    },
  },
};

/** @type {typeof StartButton & Partial<{ args: object }>} */
const Template = StartButton;

export const Normal = Template.bind({});
Normal.args = {
  type: 'normal',
  children: 'Start',
};

export const Selected = Template.bind({});
Selected.args = {
  type: 'selected',
  children: 'Start',
};
