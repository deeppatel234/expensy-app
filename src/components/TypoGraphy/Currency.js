import React from "react";
import { connect } from "react-redux";

import Typography from "Components/Typography";
import CurrencyCode from "Utils/CurrencyCode";

const Currency = ({ children, currency, ...props }) => (
  <Typography {...props}>
    {children} {CurrencyCode[currency].unicode}
  </Typography>
);

const mapStateToProps = state => {
  return {
    currency: state.setting.currency,
  };
};

export default connect(mapStateToProps)(Currency);
