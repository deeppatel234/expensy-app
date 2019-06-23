import React from "react";
import { connect } from "react-redux";
import Typography from "Components/Typography";
import Icon from "Components/Icon";
import Redux from "Redux/ReduxRegistry";

import { HeaderWrapper, MenuButton } from "./styled";

const Header = ({ menu = true, text, openMenuDrawer }) => (
  <HeaderWrapper>
    {menu && (
      <MenuButton onPress={openMenuDrawer}>
        <Icon iconType="Feather" icon="menu" appearance="primary" size={32} />
      </MenuButton>
    )}
    <Typography type="heading" appearance="primary">
      {text}
    </Typography>
  </HeaderWrapper>
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
)(Header);
