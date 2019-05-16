import React from "react";
import { withTheme } from "styled-components";
import { SwitchComp } from "./style";

const Switch = ({ theme, ...props }) => {
  return (
    <SwitchComp
      trackColor={{ true: "red", false: "green" }}
      thumbColor={theme.primary}
      {...props}
    />
  );
};

Switch.defaultProps = {
  appearance: "default"
};

export default withTheme(Switch);
