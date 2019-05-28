import React, { useState, useCallback } from "react";
import { TouchableHighlight } from "react-native";
import { connect } from "react-redux";

import Typography from "Components/Typography";
import Button from "Components/Button";

import { PRIMARY } from "Src/theme";
import Redux from "Redux/ReduxRegistry";
import Avatar from "Components/Avatar";
import CurrencyModal from "Screens/currency/CurrencyModal";
import CurrencyCode from "Utils/CurrencyCode";

import {
  CurrencyChooseWrapper,
  SelectText,
  AppName,
  CurrencyText,
  CurrencyIcon,
  CurrencyTextWrapper,
  FooterButton
} from "./styled";

const CurrencyChoose = ({ onDone, setting, changeCurrency }) => {
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);

  const onSelectCurrency = useCallback(data => {
    changeCurrency(data);
    setCurrencyModalVisible(false);
  }, []);

  return (
    <CurrencyChooseWrapper>
      <AppName>
        <Typography type="appLogo" color={PRIMARY}>
          Expensy
        </Typography>
      </AppName>
      <SelectText>
        <Typography type="title" color={PRIMARY} size={25}>
          Select Your Currency
        </Typography>
        <CurrencyTextWrapper>
          <TouchableHighlight onPress={() => setCurrencyModalVisible(true)}>
            <CurrencyText>
              <CurrencyIcon>
                <Avatar.Currency currency={setting.currency} />
              </CurrencyIcon>
              <Typography>{CurrencyCode[setting.currency].name}</Typography>
            </CurrencyText>
          </TouchableHighlight>
        </CurrencyTextWrapper>
        <CurrencyModal
          visible={currencyModalVisible}
          onSelect={onSelectCurrency}
          onClose={() => setCurrencyModalVisible(false)}
        />
      </SelectText>
      <FooterButton>
        <Button
          onPress={onDone}
          appearance="primary"
          text="Done"
          borderRadius
          block
        />
      </FooterButton>
    </CurrencyChooseWrapper>
  );
};

const mapStateToProps = state => {
  return {
    setting: state.setting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCurrency: currency =>
      dispatch(Redux.get("setting", "changeCurrency")(currency))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyChoose);
