import React, { useState, useEffect, useCallback } from "react";
import { TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import TouchID from "react-native-touch-id";

import Typography from "Components/Typography";
import Icon from "Components/Icon";
import Avatar from "Components/Avatar";
import Switch from "Components/Switch";
import Header from "Components/Header";
import Footer from "Components/Footer";

import Redux from "Redux/ReduxRegistry";

import { Container, Heading, Content } from "Src/globalStyle";

import CurrencyModal from "Screens/currency/CurrencyModal";

import ColorThemeModal from "./components/ColorTheme";

import {
  SettingItem,
  ThemeSwitchWrapper,
  ThemeName,
  SettingNameWrapper,
  SettingIcon
} from "./styled";

import { ColorIcon } from "./components/styled";

const Setting = ({
  setting,
  changeFingerPrintLock,
  changeTheme,
  changeColor,
  changePinLock,
  changeCurrency
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFingerPrintSupported, setIsFingerPrintSupported] = useState(true);
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);

  useEffect(() => {
    TouchID.isSupported()
      .then(() => {
        setIsFingerPrintSupported(true);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const onSelectCurrency = useCallback(data => {
    changeCurrency(data);
    setCurrencyModalVisible(false);
  }, []);

  const onSelectColor = useCallback(data => {
    changeColor(data);
    setColorModalVisible(false);
  }, []);

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
              <Icon iconType="MaterialCommunityIcons" icon="theme-light-dark" />
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
        {setting.isLightTheme && (
          <SettingItem>
            <SettingNameWrapper>
              <SettingIcon>
                <Icon iconType="MaterialCommunityIcons" icon="format-color-fill" />
              </SettingIcon>
              <Typography>Color</Typography>
            </SettingNameWrapper>
            <ColorIcon
              onPress={() => setColorModalVisible(true)}
              appearance="primary"
            />
          </SettingItem>
        )}
        {isFingerPrintSupported && (
          <SettingItem>
            <SettingNameWrapper>
              <SettingIcon>
                <Icon iconType="MaterialCommunityIcons" icon="fingerprint" />
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
              <Icon iconType="MaterialCommunityIcons" icon="lock-outline" />
            </SettingIcon>
            <Typography>Pin Lock</Typography>
          </SettingNameWrapper>
          <Switch value={setting.pinLock} onValueChange={changePinLock} />
        </SettingItem> */}
        <SettingItem>
          <SettingNameWrapper>
            <SettingIcon>
              <Icon iconType="MaterialCommunityIcons" icon="currency-inr" />
            </SettingIcon>
            <Typography>Currency</Typography>
          </SettingNameWrapper>
          <TouchableHighlight onPress={() => setCurrencyModalVisible(true)}>
            <Avatar.Currency currency={setting.currency} />
          </TouchableHighlight>
        </SettingItem>
        <CurrencyModal
          visible={currencyModalVisible}
          onSelect={onSelectCurrency}
          onClose={() => setCurrencyModalVisible(false)}
        />
        <ColorThemeModal
          visible={colorModalVisible}
          onSelect={onSelectColor}
          onClose={() => setColorModalVisible(false)}
        />
      </Content>
      <Footer actionIcon="home" actionLink="/" />
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
    changeColor: color => dispatch(Redux.get("setting", "changeColor")(color)),
    changeCurrency: currency =>
      dispatch(Redux.get("setting", "changeCurrency")(currency)),
    changePinLock: isLocked =>
      dispatch(Redux.get("setting", "changePinLock")(isLocked))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
