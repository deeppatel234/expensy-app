import React from 'react';
import { Link } from 'react-router-native';

import Button from '../Button';

const ButtonLink = ({ component, ...props }) => {
  return (
    <Link {...props} component={component || Button} />
  );
};

ButtonLink.defaultProps = {
  appearance: 'black',
  component: false,
};

export default ButtonLink;
