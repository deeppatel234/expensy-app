import React from "react";

import Typography from "Components/Typography";

import { Wrapper, AvatarImage } from "./styled";

const Empty = props => (
  <Wrapper>
    <AvatarImage source={require("Src/assets/icons/empty.jpg")} {...props} />
    <Typography appearance="gray">No Records</Typography>
  </Wrapper>
);

export default Empty;
