import React from 'react';

import Icon from 'Components/Icon';

import { FooterWrapper, FooterButton } from './style';

const Footer = ({ children, ...props }) => (
  <FooterWrapper {...props}>
    {children}
  </FooterWrapper>
);

const FooterAddButton = (props) => (
  <Footer.Button {...props} >
    <Icon iconType="MaterialIcons" icon="add" appearance="white" size={30} />
  </Footer.Button>
);

Footer.Button = FooterButton;
Footer.AddButton = FooterAddButton;

export default Footer;
