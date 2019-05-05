import React from 'react';

import { Input } from './styled';
import { TYPO_STYLE } from '../TypoGraphy';

const TextInput = (props) => {
  return (
    <Input  {...props} style={TYPO_STYLE.small} placeholderStyle={TYPO_STYLE.small} />
  )
};

export default TextInput;
