import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    type: {
      options: ['normal', 'selected'],
    },
    onSelect: {
      action: 'selected',
    },
  },
};

/** @type {typeof Button & Partial<{ args: object }>} */
const Template = Button;

export const Normal = Template.bind({});
Normal.args = {
  type: 'normal',
  children: 'Sterowanie',
};

export const Selected = Template.bind({});
Selected.args = {
  type: 'selected',
  children: 'Sterowanie',
};
