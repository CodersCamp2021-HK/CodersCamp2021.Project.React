import { PageHeader as PageHeaderComponent } from './PageHeader';

export default {
  title: 'Components/Page Header',
  component: PageHeaderComponent,
};

/** @type {typeof PageHeaderComponent & Partial<{ args: object }>} */
export const PageHeader = ({ children }) => <PageHeaderComponent>{children}</PageHeaderComponent>;
PageHeader.args = {
  content: 'King and Pigs',
};
