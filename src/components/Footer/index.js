import React from "react";

import Icon from "Components/Icon";
import Link from "Components/Link";

import {
  FooterWrapper,
  FooterButton,
  LeftFooter,
  RightFooter,
  MenuButton,
  ActionButtonWrapper
} from "./styled";

const ActionButton = ({ actionIcon, iconType = "MaterialIcons", ...props }) => (
  <FooterButton {...props}>
    <Icon iconType={iconType} icon={actionIcon} appearance="white" size={25} />
  </FooterButton>
);

const TransactionMenu = props => (
  <MenuButton {...props}>
    <Icon iconType="Feather" icon="list" appearance="white" size={25} />
  </MenuButton>
);

const DashboardMenu = props => (
  <MenuButton {...props}>
    <Icon iconType="AntDesign" icon="dashboard" appearance="white" size={22} />
  </MenuButton>
);

const SettingMenu = props => (
  <MenuButton {...props}>
    <Icon iconType="AntDesign" icon="setting" appearance="white" size={22} />
  </MenuButton>
);

const WalletMenu = props => (
  <MenuButton {...props}>
    <Icon iconType="AntDesign" icon="wallet" appearance="white" size={22} />
  </MenuButton>
);

const CategoryMenu = props => (
  <MenuButton {...props}>
    <Icon iconType="AntDesign" icon="API" appearance="white" size={22} />
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
        <Link to="/" component={DashboardMenu} />
        <Link to="/transaction-list" component={TransactionMenu} />
      </LeftFooter>
    )}
    <ActionButtonWrapper>
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
    </ActionButtonWrapper>
    {menu && (
      <RightFooter>
        <Link to="/setting" component={SettingMenu} />
        <Link to="/view-wallet" component={WalletMenu} />
        <Link to="/view-category" component={CategoryMenu} />
      </RightFooter>
    )}
  </FooterWrapper>
);

export default Footer;
