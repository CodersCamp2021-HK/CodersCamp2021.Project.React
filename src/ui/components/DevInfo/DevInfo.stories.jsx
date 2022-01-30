import { DevInfo as DevInfoComponent } from './DevInfo';
import imgUrl from '../../../public/img/tc_pixel.png';

export default {
  title: 'Components/Dev Info',
  component: DevInfoComponent,
  special: {
    options: ['true', 'false'],
  },
};

/** @type {typeof DevInfoComponent & Partial<{ args: object }>} */
const Template = DevInfoComponent;

export const Dev = Template.bind({});
Dev.args = {
  image: imgUrl,
  name: 'Jan Kowalski',
  devRole: 'Project Manager, Programmer',
  special: false,
};

export const Mentor = Template.bind({});
Mentor.args = {
  image: imgUrl,
  name: 'Jan Kowalski',
  devRole: 'Project Manager, Programmer',
  special: true,
};
