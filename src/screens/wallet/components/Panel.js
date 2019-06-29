import React from "react";

import { TouchableOpacity } from "react-native";

import Typography from "Components/Typography";
import Icon from "Components/Icon";
import Link from "Components/Link";
import TypographyCurrency from "Components/Typography/Currency";
import Avatar from "Components/Avatar";

import { FlexRow, ListItem, RightList, ListDetails } from "Src/globalStyle";

const Panel = ({ wallet }) => (
  <ListItem>
    <Avatar.Icon iconKey={wallet.icon} />
    <RightList>
      <Typography>{wallet.name}</Typography>
      <TypographyCurrency type="small">{wallet.balance}</TypographyCurrency>
    </RightList>
  </ListItem>
);

const EditIcon = props => (
  <TouchableOpacity {...props}>
    <Icon iconType="Feather" icon="edit-2" />
  </TouchableOpacity>
);

export const EditPanel = ({ wallet }) => (
  <ListDetails>
    <FlexRow>
      <Avatar.Icon iconKey={wallet.icon} />
      <RightList>
        <Typography>{wallet.name}</Typography>
        <TypographyCurrency type="small">{wallet.balance}</TypographyCurrency>
      </RightList>
    </FlexRow>
    <Link
      key={wallet._id}
      to={`/edit-wallet/${wallet._id}`}
      component={EditIcon}
    />
  </ListDetails>
);

const WalletPanel = ({ wallet, onPress }) => {
  if (!onPress) {
    return <Panel wallet={wallet} />;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Panel wallet={wallet} />
    </TouchableOpacity>
  );
};

export default WalletPanel;
