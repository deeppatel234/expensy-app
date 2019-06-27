import React from "react";
import { Switch } from "react-native";
import { withTheme } from "styled-components";

import { LightenDarkenColor } from "Utils/utility";

const SwitchComp = ({ theme, ...props }) => {
  const lightenColor = LightenDarkenColor(theme.primary, 30);
  return (
    <Switch
      trackColor={{ true: lightenColor, false: theme.brand.lightGray }}
      thumbColor={theme.primary}
      {...props}
    />
  );
};

SwitchComp.defaultProps = {
  appearance: "black"
};

export default withTheme(SwitchComp);
