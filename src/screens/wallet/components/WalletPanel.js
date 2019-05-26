import React from "react";

import { TouchableHighlight } from "react-native";

import Typography from "Components/Typography";
import TypographyCurrency from "Components/Typography/Currency";
import Avatar from "Components/Avatar";

import { ListItem, RightList } from "Src/globalStyle";

const Panel = ({ wallet }) => (
  <ListItem>
    <Avatar.Icon iconKey={wallet.icon} />
    <RightList>
      <Typography>{wallet.name}</Typography>
      <TypographyCurrency type="small">
        {wallet.balance}
      </TypographyCurrency>
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
