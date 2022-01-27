import { LevelButton } from './LevelButton';

export default {
  title: 'Components/Level Button',
  component: LevelButton,
  argTypes: {
    type: {
      options: ['locked', 'unlocked', 'selected'],
      control: { type: 'radio' },
    },
    onSelect: {
      action: 'selected',
    },
  },
};

/** @type {typeof LevelButton & Partial<{ args: object }>} */
const Template = LevelButton;

export const Locked = Template.bind({});
Locked.args = {
  type: 'locked',
  children: '1',
};

export const Unlocked = Template.bind({});
Unlocked.args = {
  type: 'unlocked',
  children: '1',
};

export const Selected = Template.bind({});
Selected.args = {
  type: 'selected',
  children: '1',
};
