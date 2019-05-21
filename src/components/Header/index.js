import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';

import Icon from 'Components/Icon';
import TypoGraphy from 'Components/TypoGraphy';

import Redux from "Redux/ReduxRegistry";

import {
  HeaderWrapper,
  MenuButton,
} from './style';

const Header = ({ text, openMenuDrawer, menu = true }) => (
  <HeaderWrapper>
    {
      menu && (
        <MenuButton>
          <TouchableOpacity onPress={openMenuDrawer}>
            <Icon type="Feather" name="menu" size={30} />
          </TouchableOpacity>
        </MenuButton>
      )
    }
    <TypoGraphy type="heading" appearance="primary">{text}</TypoGraphy>
  </HeaderWrapper>
);

const mapDispatchToProps = dispatch => {
  return {
    openMenuDrawer: () => dispatch(Redux.get("setting", "changeMenuDrawerVisibility")(true)),
  };
};

export default connect(null, mapDispatchToProps)(Header);
