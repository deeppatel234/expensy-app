import React from "React";

import { BadgeWrapper } from "./styled";


const Badge = ({ children, ...props }) => (
  <BadgeWrapper {...props}>
    {children}
  </BadgeWrapper>
);

Badge.defaultProps = {
  appearance: "primary",
};

export default Badge;
