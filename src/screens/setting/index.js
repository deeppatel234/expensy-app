import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import TouchID from "react-native-touch-id";

import Typography from "Components/Typography";
import Icon from "Components/Icon";
import Avatar from "Components/Avatar";
import Switch from "Components/Switch";
import Header from "Components/Header";
import Footer from "Components/Footer";
import Button from "Components/Button";

import Redux from "Redux/ReduxRegistry";

import { Container, Heading, Content } from "Src/globalStyle";

import CurrencyModal from "Screens/currency/CurrencyModal";
import PinLockModal from "Screens/pinlock/Modal";

import ColorThemeModal from "./components/ColorTheme";

import {
  SettingItem,
  ThemeSwitchWrapper,
  ThemeName,
  SettingNameWrapper,
  SettingIcon,
  ChangePinButton,
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
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [isOpenFromFP, setIsOpenFromFP] = useState(false);
  const [isChangePin, setIsChangePin] = useState(false);

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

  const onChangeFingerPrint = data => {
    if (setting.pinLock || !data) {
      changeFingerPrintLock(data);
    } else {
      setIsOpenFromFP(true);
      setPinModalVisible(true);
    }
  };

  const onSelectSetPin = useCallback((data, state) => {
    changePinLock(true, data.pin);
    if (state) {
      changeFingerPrintLock(true);
    }
    setPinModalVisible(false);
    setIsOpenFromFP(false);
    setIsChangePin(false);
  }, []);

  const onChangePinLock = useCallback(data => {
    if (data) {
      setPinModalVisible(true);
    } else {
      changePinLock(false);
    }
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
                <Icon
                  iconType="MaterialCommunityIcons"
                  icon="format-color-fill"
                />
              </SettingIcon>
              <Typography>Color</Typography>
            </SettingNameWrapper>
            <ColorIcon
              onPress={() => setColorModalVisible(true)}
              appearance="primary"
            />
          </SettingItem>
        )}
        <SettingItem>
          <SettingNameWrapper>
            <SettingIcon>
              <Icon iconType="MaterialCommunityIcons" icon="lock-outline" />
            </SettingIcon>
            <Typography>Pin Lock</Typography>
          </SettingNameWrapper>
          <Switch value={setting.pinLock} onValueChange={onChangePinLock} />
        </SettingItem>
        {
          setting.pinLock && (
            <ChangePinButton>
              <Button
                onPress={() => {
                  setIsChangePin(true);
                  setPinModalVisible(true);
                }}
                appearance="primary"
                text="Change Pin"
                borderRadius
                small
              />
            </ChangePinButton>
          )
        }
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
              onValueChange={onChangeFingerPrint}
            />
          </SettingItem>
        )}
        <SettingItem>
          <SettingNameWrapper>
            <SettingIcon>
              <Icon iconType="MaterialCommunityIcons" icon="currency-inr" />
            </SettingIcon>
            <Typography>Currency</Typography>
          </SettingNameWrapper>
          <TouchableOpacity onPress={() => setCurrencyModalVisible(true)}>
            <Avatar.Currency currency={setting.currency} />
          </TouchableOpacity>
        </SettingItem>
        <CurrencyModal
          visible={currencyModalVisible}
          onSelect={onSelectCurrency}
          onClose={() => setCurrencyModalVisible(false)}
        />
        <PinLockModal
          visible={pinModalVisible}
          isOpenFromFP={isOpenFromFP}
          isChangePin={isChangePin}
          onSelect={onSelectSetPin}
          currentPin={setting.pin}
          onClose={() => {
            setPinModalVisible(false);
            setIsOpenFromFP(false);
            setIsChangePin(false);
          }}
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
    changePinLock: (isLocked, pin) =>
      dispatch(Redux.get("setting", "changePinLock")(isLocked, pin))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
