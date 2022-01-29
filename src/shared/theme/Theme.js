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
      secondary: '#92532f',
    },
    background: {
      solid: '#3f3851',
      transparent: 'rgba(0, 0, 0, 0.65)',
    },
    gradient: {
      colorful: 'linear-gradient(rgb(250, 205, 116), rgb(72, 195, 138))',
      steel: 'linear-gradient(rgba(255, 255, 255, 1), rgba(102, 102, 102, 1))',
      selectedLevel: 'linear-gradient(rgba(255, 255, 255, 1), rgba(255, 215, 0, 1))',
    },
  },
  transitions: {
    default: 'all 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
  },
  fontSize: {
    primary: '1rem',
    btnBigger: '1.08rem',
    btnNormal: '0.85rem',
    headerBig: '2.88rem',
  },
  fontFamily: {
    default: "'Press Start 2P', cursive",
    primary: "'DM Mono', monospace",
  },
};

export const { theme, variables } = transformToCssVariablesTheme(valueTheme);
