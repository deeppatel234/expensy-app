import React from 'react';

import Icon from 'Components/Icon';

import { FooterWrapper, FooterButton } from './style';

const Footer = ({ children, ...props }) => (
  <FooterWrapper {...props}>
    {children}
  </FooterWrapper>
);

const AddButton = (props) => (
  <Footer.Button {...props} >
    <Icon iconType="MaterialIcons" icon="add" appearance="white" size={30} />
  </Footer.Button>
);

const CloseButton = (props) => (
  <Footer.Button {...props} >
    <Icon iconType="MaterialIcons" icon="close" appearance="white" size={30} />
  </Footer.Button>
);

Footer.Button = FooterButton;
Footer.AddButton = AddButton;
Footer.CloseButton = CloseButton;

export default Footer;
