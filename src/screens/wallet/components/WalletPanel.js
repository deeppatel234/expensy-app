import React from "react";

import { TouchableHighlight } from "react-native";

import Typography from "Components/Typography";
import Avatar from "Components/Avatar";
import CurrencyCode from "Utils/CurrencyCode";

import { ListItem, RightList } from "Src/globalStyle";

const Panel = ({ wallet }) => (
  <ListItem>
    <Avatar.Icon iconKey={wallet.icon} />
    <RightList>
      <Typography>{wallet.name}</Typography>
      <Typography type="small">
        {wallet.balance} {CurrencyCode[wallet.currency].unicode}
      </Typography>
    </RightList>
  </ListItem>
);

const WalletPanel = ({ wallet, onPress }) => {
  if (!onPress) {
    return <Panel wallet={wallet} />;
  }

  return (
    <TouchableHighlight onPress={onPress}>
      <Panel wallet={wallet} />
    </TouchableHighlight>
  );
};

export default WalletPanel;
