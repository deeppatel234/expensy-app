import React from 'react';

import TypoGraphy from '../TypoGraphy';

import { ButtonElement } from './styled';

const APPEARANCE_MAP = {
  primary: 'white',
  black: 'primary',
};

const Button = (props) => (
  <ButtonElement  {...props}>
    <TypoGraphy appearance={APPEARANCE_MAP[props.appearance]}>{props.text}</TypoGraphy>
  </ButtonElement>
);

Button.defaultProps = {
  appearance: 'black',
  block: false,
};

export default Button;
