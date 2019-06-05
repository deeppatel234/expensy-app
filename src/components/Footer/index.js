import React from "react";

import Icon from "Components/Icon";
import Link from "Components/Link";

import {
  FooterWrapper,
  FooterButton,
  LeftFooter,
  RightFooter,
  MenuButton
} from "./styled";

const ActionButton = ({ actionIcon, ...props }) => (
  <FooterButton {...props}>
    <Icon
      iconType="MaterialIcons"
      icon={actionIcon}
      appearance="white"
      size={25}
    />
  </FooterButton>
);

const TransactionMenu = (props) => (
  <MenuButton {...props}>
    <Icon type="Feather" name="list" appearance="white" size={25} />
  </MenuButton>
)

const Footer = ({
  openMenuDrawer,
  menu = true,
  actionIcon,
  actionLink,
  onActionClick,
  ...props
}) => (
  <FooterWrapper {...props}>
    {menu && (
      <LeftFooter>
        <Link to="/transaction-list" component={TransactionMenu} />
      </LeftFooter>
    )}
    {actionLink ? (
      <Link to={actionLink} actionIcon={actionIcon} component={ActionButton} />
    ) : (
      <ActionButton actionIcon={actionIcon} onPress={onActionClick} />
    )}
    {menu && (
      <RightFooter />
    )}
  </FooterWrapper>
);

export default Footer;
