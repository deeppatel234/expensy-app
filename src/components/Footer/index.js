import React from "react";

import Icon from "Components/Icon";

import { FooterWrapper, FooterButton } from "./styled";

const Footer = ({ children, ...props }) => (
  <FooterWrapper {...props}>{children}</FooterWrapper>
);

const AddButton = props => (
  <Footer.Button {...props}>
    <Icon iconType="MaterialIcons" icon="add" appearance="white" size={30} />
  </Footer.Button>
);

const EditButton = props => (
  <Footer.Button {...props}>
    <Icon iconType="MaterialIcons" icon="edit" appearance="white" size={30} />
  </Footer.Button>
);

const SaveButton = props => (
  <Footer.Button {...props}>
    <Icon iconType="MaterialIcons" icon="save" appearance="white" size={30} />
  </Footer.Button>
);

const CloseButton = props => (
  <Footer.Button {...props}>
    <Icon iconType="MaterialIcons" icon="close" appearance="white" size={30} />
  </Footer.Button>
);

Footer.Button = FooterButton;
Footer.AddButton = AddButton;
Footer.CloseButton = CloseButton;
Footer.EditButton = EditButton;
Footer.SaveButton = SaveButton;

export default Footer;
