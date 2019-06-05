import React from "react";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";

import Typography from "Components/Typography";
import TypographyCurrency from "Components/Typography/Currency";
import Avatar from "Components/Avatar";

import { fixedAmount } from "Utils/utility";

import {
  WidgetWrapper,
  Details,
  LeftDetails,
  WidgetTitle,
  IconWrapper,
  SubDetails
} from "./style";

const WalletOverview = ({ wallets }) => (
  <WidgetWrapper>
    <React.Fragment>
      <WidgetTitle>
        <Typography type="title">Wallets</Typography>
      </WidgetTitle>
      {Object.values(wallets).map(({ _id, type, icon, name, balance }) => (
        <Details key={_id}>
          <LeftDetails>
            <IconWrapper marginPosition="right">
              <Avatar.Icon iconKey={icon} />
            </IconWrapper>
            <SubDetails>
              <Typography>{name}</Typography>
              <Typography appearance="gray">{type}</Typography>
            </SubDetails>
          </LeftDetails>
          <TypographyCurrency appearance={balance >= 0 ? "black" : "red"}>
            {fixedAmount(balance)}
          </TypographyCurrency>
        </Details>
      ))}
    </React.Fragment>
  </WidgetWrapper>
);

export default WalletOverview;
