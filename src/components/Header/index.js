import React from "react";
import Typography from "Components/Typography";

import { HeaderWrapper } from "./styled";

const Header = ({ text }) => (
  <HeaderWrapper>
    <Typography type="heading" appearance="primary">
      {text}
    </Typography>
  </HeaderWrapper>
);

export default Header;
