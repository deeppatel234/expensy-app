import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TouchID from "react-native-touch-id";

import Typography from "Components/Typography";
import Icon from "Components/Icon";
import Switch from "Components/Switch";
import Header from "Components/Header";

import Redux from "Redux/ReduxRegistry";

import { Container, Heading, Content } from "Src/globalStyle";

import {
  SettingItem,
  ThemeSwitchWrapper,
  ThemeName,
  SettingNameWrapper,
  SettingIcon
} from "./styled";

const Setting = ({
  setting,
  changeFingerPrintLock,
  changeTheme,
  changePinLock,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFingerPrintSupported, setIsFingerPrintSupported] = useState(true);

  useEffect(() => {
    TouchID.isSupported()
      .then(() => {
        setIsFingerPrintSupported(true);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  });

  if (isLoading) {
    <Typography>Loading</Typography>;
  }

  return (
    <Container>
      <Heading>
        <Header text="Settings" />
      </Heading>
      <Content>
        <SettingItem>
          <SettingNameWrapper>
            <SettingIcon>
              <Icon type="MaterialCommunityIcons" name="theme-light-dark" />
            </SettingIcon>
            <Typography>Theme</Typography>
          </SettingNameWrapper>
          <ThemeSwitchWrapper>
            <ThemeName>
              <Typography type="small">
                {setting.isLightTheme ? "light" : "dark"}
              </Typography>
            </ThemeName>
            <Switch value={setting.isLightTheme} onValueChange={changeTheme} />
          </ThemeSwitchWrapper>
        </SettingItem>
        {isFingerPrintSupported && (
          <SettingItem>
            <SettingNameWrapper>
              <SettingIcon>
                <Icon type="MaterialCommunityIcons" name="fingerprint" />
              </SettingIcon>
              <Typography>Fingerprint Lock</Typography>
            </SettingNameWrapper>
            <Switch
              value={setting.fingerPrintLock}
              onValueChange={changeFingerPrintLock}
            />
          </SettingItem>
        )}
        {/* <SettingItem>
          <SettingNameWrapper>
            <SettingIcon>
              <Icon type="MaterialCommunityIcons" name="lock-outline" />
            </SettingIcon>
            <Typography>Pin Lock</Typography>
          </SettingNameWrapper>
          <Switch value={setting.pinLock} onValueChange={changePinLock} />
        </SettingItem> */}
      </Content>
    </Container>
  );
};

// Maps state from store to props
const mapStateToProps = state => {
  return {
    setting: state.setting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFingerPrintLock: isLocked =>
      dispatch(Redux.get("setting", "changeFingerPrintLock")(isLocked)),
    changeTheme: isLightTheme =>
      dispatch(Redux.get("setting", "changeTheme")(isLightTheme)),
    changePinLock: isLocked =>
      dispatch(Redux.get("setting", "changePinLock")(isLocked))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
