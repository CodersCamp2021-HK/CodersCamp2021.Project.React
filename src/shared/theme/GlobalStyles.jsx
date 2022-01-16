import { css, Global } from '@emotion/react';
import { variables } from './Theme';

const styles = css`
  :root {
    ${Object.entries(variables)
      .map(([k, v]) => `${k}: ${v};`)
      .join('\n')}
  }
`;

const GlobalStyles = () => <Global styles={styles} />;

export { GlobalStyles };
