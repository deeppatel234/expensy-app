import React, { useState } from "react";
import { Alert } from "react-native";

import _range from "lodash/range";
import Icon from "Components/Icon";
import Typography from "Components/Typography";

import {
  Wrapper,
  AppNameWrapper,
  NumpadWrapper,
  NumpadRow,
  Numpad,
  PinDisplay,
  Pin
} from "./styled";

const KEY_PAD = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

const NumPadComp = ({ list, onClick }) => (
  <NumpadRow>
    {list.map(l => (
      <Numpad key={l} onPress={() => onClick(l)}>
        <Typography size={30}>{l}</Typography>
      </Numpad>
    ))}
  </NumpadRow>
);

const PinLock = ({ userPin, onPassed }) => {
  const [pin, setPin] = useState("");

  const onNumClick = num => {
    const newPin = pin + num;
    setPin(newPin);
    if (newPin.length === 4) {
      if (newPin === userPin) {
        onPassed();
      } else {
        Alert.alert(
          "Wrong Pin",
          "please try again.",
          [{ text: "Try again", onPress: () => setPin("") }],
          { cancelable: false }
        );
      }
    }
  };

  const clearAll = () => setPin('');

  const deleteChar = () => {
    if (pin.length) {
      setPin(pin.slice(0, -1));
    }
  };

  return (
    <Wrapper>
      <AppNameWrapper>
        <Typography type="appLogo" appearance="primary">
          Expensy
        </Typography>
      </AppNameWrapper>
      <NumpadWrapper>
        <PinDisplay>
          {_range(4).map(n => (
            <Pin key={n}>
              <Icon
                iconType="MaterialCommunityIcons"
                icon={
                  pin[n] !== undefined
                    ? "checkbox-blank-circle"
                    : "checkbox-blank-circle-outline"
                }
                size={35}
                appearance={pin[n] !== undefined ? "primary" : "gray"}
              />
            </Pin>
          ))}
        </PinDisplay>
        {KEY_PAD.map(kp => (
          <NumPadComp key={kp[0]} list={kp} onClick={onNumClick} />
        ))}
        <NumpadRow>
          <Numpad onPress={clearAll}>
            <Typography size={30}>
              <Icon iconType="Feather" icon="x" size={30} />
            </Typography>
          </Numpad>
          <Numpad onPress={() => onNumClick(0)}>
            <Typography size={30}>0</Typography>
          </Numpad>
          <Numpad onPress={deleteChar}>
            <Typography size={30}>
              <Icon iconType="Feather" icon="delete" size={30} />
            </Typography>
          </Numpad>
        </NumpadRow>
      </NumpadWrapper>
    </Wrapper>
  );
};

export default PinLock;
