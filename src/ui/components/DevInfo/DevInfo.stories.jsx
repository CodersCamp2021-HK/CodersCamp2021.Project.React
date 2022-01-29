import { DevInfo as DevInfoComponent } from './DevInfo';
import imgUrl from '../../../public/img/tc_pixel.png';

export default {
  title: 'Components/Dev Info',
  component: DevInfoComponent,
};

/** @type {typeof DevInfoComponent & Partial<{ args: object }>} */
export const DevInfo = ({ image, name, devRole }) => <DevInfoComponent image={image} name={name} devRole={devRole} />;
DevInfo.args = {
  image: imgUrl,
  name: 'Jan Kowalski',
  devRole: 'Project Manager, Programmer',
};
