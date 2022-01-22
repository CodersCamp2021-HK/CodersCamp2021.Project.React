import { transformToCssVariablesTheme } from './Utils';

const valueTheme = {
  colors: {
    common: {
      white: '#ffffff',
    },
    primary: {
      main: '#facd74',
    },
    background: {
      solid: '#3f3851',
      transparent: 'rgba(0, 0, 0, 0.65)',
    },
  },
};

export const { theme, variables } = transformToCssVariablesTheme(valueTheme);
