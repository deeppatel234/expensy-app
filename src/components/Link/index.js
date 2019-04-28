import React from 'react';
import { Link } from 'react-router-native';

import Button from '../Button';

const ButtonLink = (props) => {
  return (
    <Link {...props} component={Button} />
  );
};

ButtonLink.defaultProps = {
  appearance: 'default',
};

export default ButtonLink;
