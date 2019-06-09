import React from "React";
import { TouchableHighlight } from "react-native";

import Typography from "Components/Typography";
import Avatar from "Components/Avatar";
import Badge from "Components/Badge";
import Icon from "Components/Icon";
import TypographyCurrency from "Components/Typography/Currency";

import { FlexRow } from "Src/globalStyle";
import { TRANSACTION_TYPE } from "Models/TransactionModel";
import { fixedAmount } from "Utils/utility";

import {
  TransactionWrapper,
  CardHeader,
  CardContent,
  SubDetails,
  AmountText,
  TransferIcon
} from "./styled";

export const TRANSACTION_TYPE_COLOR = {
  [TRANSACTION_TYPE.INCOME]: "green",
  [TRANSACTION_TYPE.EXPENSE]: "red",
  [TRANSACTION_TYPE.TRANSFER]: "teal"
};

const Panel = ({
  data: { type, wallet, category, toWallet, description, dateTime, amount },
  wallets,
  categories
}) => (
  <TransactionWrapper>
    <CardHeader>
      <Badge appearance={TRANSACTION_TYPE_COLOR[type]}>
        <Typography appearance="white" size={10}>
          {type}
        </Typography>
      </Badge>
      <Badge appearance="primary">
        <Typography appearance="white" size={10}>
          {wallets[wallet].type}
        </Typography>
      </Badge>
    </CardHeader>
    <CardContent>
      <FlexRow>
        <Avatar.Icon iconKey={categories[category].icon} />
        <SubDetails type="left">
          <Typography>{categories[category].name}</Typography>
          <Typography appearance="gray">{description}</Typography>
        </SubDetails>
      </FlexRow>
      <FlexRow>
        <SubDetails type="right">
          <AmountText>
            <TypographyCurrency
              appearance={TRANSACTION_TYPE.EXPENSE === type ? "red" : "black"}
            >
              {fixedAmount(amount)}
            </TypographyCurrency>
          </AmountText>
          <Typography appearance="gray">{dateTime}</Typography>
        </SubDetails>
        <Avatar.Icon iconKey={wallets[wallet].icon} />
        {TRANSACTION_TYPE.TRANSFER === type && (
          <React.Fragment>
            <TransferIcon>
              <Icon iconType="AntDesign" icon="arrowright" />
            </TransferIcon>
            <Avatar.Icon iconKey={wallets[toWallet].icon} />
          </React.Fragment>
        )}
      </FlexRow>
    </CardContent>
  </TransactionWrapper>
);

const TransactionPanel = ({ onPress, ...props }) => {
  if (!onPress) {
    return <Panel {...props} />;
  }

  return (
    <TouchableHighlight onPress={onPress}>
      <Panel {...props} />
    </TouchableHighlight>
  );
};

export default TransactionPanel;
