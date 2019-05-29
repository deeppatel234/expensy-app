import React from "react";
import { connect } from "react-redux";

import Icon from "Components/Icon";
import Link from "Components/Link";

import Redux from "Redux/ReduxRegistry";

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

const Footer = ({
  openMenuDrawer,
  menu = true,
  actionIcon,
  actionLink,
  onActionClick,
  ...props
}) => (
  <FooterWrapper {...props}>
    <LeftFooter>
      {menu && (
        <MenuButton onPress={openMenuDrawer}>
          <Icon type="Feather" name="menu" appearance="white" size={25} />
        </MenuButton>
      )}
    </LeftFooter>
    {actionLink ? (
      <Link to={actionLink} actionIcon={actionIcon} component={ActionButton} />
    ) : (
      <ActionButton actionIcon={actionIcon} onPress={onActionClick} />
    )}
    <RightFooter />
  </FooterWrapper>
);

const mapDispatchToProps = dispatch => {
  return {
    openMenuDrawer: () =>
      dispatch(Redux.get("setting", "changeMenuDrawerVisibility")(true))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Footer);
