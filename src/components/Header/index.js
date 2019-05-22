import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";

import Icon from "Components/Icon";
import Typography from "Components/Typography";

import Redux from "Redux/ReduxRegistry";

import { HeaderWrapper, MenuButton } from "./styled";

const Header = ({ text, openMenuDrawer, menu = true }) => (
  <HeaderWrapper>
    {menu && (
      <MenuButton>
        <TouchableOpacity onPress={openMenuDrawer}>
          <Icon type="Feather" name="menu" size={30} />
        </TouchableOpacity>
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
