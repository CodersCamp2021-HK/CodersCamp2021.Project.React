import { transformToCssVariablesTheme } from './Utils';

const valueTheme = {
  colors: {
    common: {
      white: '#ffffff',
    },
    primary: {
      main: '#facd74',
    },
    text: {
      primary: '#3f3851',
    },
    background: {
      solid: '#3f3851',
      transparent: 'rgba(0, 0, 0, 0.65)',
    },
    gradient: {
      colorful: 'linear-gradient(rgb(250, 205, 116), rgb(72, 195, 138))',
    },
  },
};

export const { theme, variables } = transformToCssVariablesTheme(valueTheme);
