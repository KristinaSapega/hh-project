import { PaletteOptions } from '@mui/material';

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#FB3C1A',
    contrastText: '#EDEDED',
  },
  secondary: {
    main: 'rgba(0, 0, 0, 0.3)',
    contrastText: '#ffffff',
  },
  background: {
    default: '#ffffff',
    paper: '#F4F4F4',
  },
  text: {
    primary: '#4e4e4e',
    secondary: 'rgba(0, 0, 0, 0.5)',
    disabled: 'rgba(0, 0, 0, 0.3)',
  },
  success: {
    main: '#58BC35',
  },
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#FB3C1A',
  },
  secondary: {
    main: 'rgba(255, 255, 255, 0.3)',
    contrastText: '#ffffff',
  },
  background: {
    default: '#1C1C28',
    paper: '#252631',
  },
  text: {
    primary: 'rgba(255, 255, 255, 0.7)',
    secondary: 'rgba(255, 255, 255, 0.5)',
    disabled: 'rgba(255, 255, 255, 0.3)',
  },
  success: {
    main: '#58BC35',
  },
};

export { lightPalette, darkPalette };
