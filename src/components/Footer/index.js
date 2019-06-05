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

const ActionButton = ({ actionIcon, iconType = "MaterialIcons", ...props }) => (
  <FooterButton {...props}>
    <Icon
      iconType={iconType}
      icon={actionIcon}
      appearance="white"
      size={25}
    />
  </FooterButton>
);

const TransactionMenu = props => (
  <MenuButton {...props}>
    <Icon type="Feather" name="list" appearance="white" size={25} />
  </MenuButton>
);

const Footer = ({
  openMenuDrawer,
  menu = true,
  iconType,
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
      <Link
        to={actionLink}
        iconType={iconType}
        actionIcon={actionIcon}
        component={ActionButton}
      />
    ) : (
      <ActionButton
        iconType={iconType}
        actionIcon={actionIcon}
        onPress={onActionClick}
      />
    )}
    {menu && <RightFooter />}
  </FooterWrapper>
);

export default Footer;
