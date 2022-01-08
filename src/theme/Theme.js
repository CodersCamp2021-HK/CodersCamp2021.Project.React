import { transformToCssVariablesTheme } from './Utils';

const valueTheme = {
  colors: {
    background: '#282c34',
    link: '#61dafb',
  },
};

export const { theme, variables } = transformToCssVariablesTheme(valueTheme);
