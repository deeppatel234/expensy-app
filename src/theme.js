const BLACK = '#000000';
const WHITE = '#ffffff';
const RED = '#dc3545';
const GRAY = '#6c757d';
const LIGHT_GRAY = '#e5e5e5'
const GREEN = '#28a745';
const TEAL = '#17a2b8';

export const COLORS = {
  RED: '#f44336',
  PINK: '#e91e63',
  PURPLE: '#9c27b0',
  DEEPPURPLE: '#673ab7',
  INDIGO: '#3f51b5',
  BLUE: '#448aff',
  LIGHTBLUE: '#03a9f4',
  CYAN: '#00bcd4',
  TEAL: '#009688',
  GREEN: '#4caf50',
  LIGHTGREEN: '#8bc34a',
  LIME: '#cddc39',
  YELLOW: '#ffeb3b',
  AMBER: '#ffc107',
  ORANGE: '#ff9800',
  DEEPORANGE: '#ff5722',
  BROWN: '#795548',
  GREY: '#9e9e9e',
  BLUEGREY: '#607d8b',
};

const light = (color) => ({
  primary: COLORS[color],
  white: WHITE,
  black: BLACK,
  red: RED,
  gray: GRAY,
  lightGray: LIGHT_GRAY,
  green: GREEN,
  teal: TEAL,
});

const dark = () => ({
  primary: WHITE,
  white: BLACK,
  black: WHITE,
  red: RED,
  gray: WHITE,
  lightGray: WHITE,
  green: WHITE,
  teal: WHITE,
});

export default getTheme = (isLightTheme, color = 'BLUE') => {
  const themeObj = isLightTheme ? light(color) : dark(color)
  themeObj.brand = light('BLUE');
  return themeObj;
};
