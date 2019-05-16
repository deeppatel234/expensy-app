import React from 'react';
import { connect } from 'react-redux';

import TypoGraphy from 'Components/TypoGraphy';
import Icon from 'Components/Icon';
import Switch from 'Components/Switch';
import Header from 'Components/Header';

import Redux from "Redux/ReduxRegistry";

import {
  Container,
  Heading,
  Content
} from 'Src/globalStyle';

import {
  SettingItem,
  ThemeSwitchWrapper,
  ThemeName,
  SettingNameWrapper,
  SettingIcon,
} from './style';

const Setting = ({ setting, changeFingerPrintLock, changeTheme, changePinLock }) => (
  <Container>
    <Heading>
      <Header text="Settings" />
    </Heading>
    <Content>
      <SettingItem>
        <SettingNameWrapper>
          <SettingIcon>
            <Icon type="MaterialCommunityIcons" name="theme-light-dark" size={20} />
          </SettingIcon>
          <TypoGraphy>Theme</TypoGraphy>
        </SettingNameWrapper>
        <ThemeSwitchWrapper>
          <ThemeName>
            <TypoGraphy type="small">{setting.isLightTheme ? 'light' : 'dark'}</TypoGraphy>
          </ThemeName>
          <Switch value={setting.isLightTheme} onValueChange={changeTheme} />
        </ThemeSwitchWrapper>
      </SettingItem>
      <SettingItem>
        <SettingNameWrapper>
          <SettingIcon>
            <Icon type="MaterialCommunityIcons" name="fingerprint" size={20} />
          </SettingIcon>
          <TypoGraphy>Fingerprint Lock</TypoGraphy>
        </SettingNameWrapper>
        <Switch value={setting.fingerPrintLock} onValueChange={changeFingerPrintLock} />
      </SettingItem>
      {/* <SettingItem>
        <SettingNameWrapper>
          <SettingIcon>
            <Icon type="MaterialCommunityIcons" name="lock-outline" size={20} />
          </SettingIcon>
          <TypoGraphy>Pin Lock</TypoGraphy>
        </SettingNameWrapper>
        <Switch value={setting.pinLock} onValueChange={changePinLock} />
      </SettingItem> */}
    </Content>
  </Container>
);

// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    setting: state.setting,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFingerPrintLock: isLocked =>
      dispatch(Redux.get("setting", "changeFingerPrintLock")(isLocked)),
    changeTheme: isLightTheme =>
      dispatch(Redux.get("setting", "changeTheme")(isLightTheme)),
    changePinLock: isLocked =>
      dispatch(Redux.get("setting", "changePinLock")(isLocked)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
