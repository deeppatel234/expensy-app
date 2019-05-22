import React from "react";
import { Switch } from "react-native";
import { withTheme } from "styled-components";

import { LightenDarkenColor } from "Utils/utility";
import { PRIMARY, LIGHT_GRAY } from "Src/theme";

const lightenColor = LightenDarkenColor(PRIMARY, 30);

const SwitchComp = ({ theme, ...props }) => (
  <Switch
    trackColor={{ true: lightenColor, false: LIGHT_GRAY }}
    thumbColor={theme.primary}
    {...props}
  />
);

SwitchComp.defaultProps = {
  appearance: "black"
};

export default withTheme(SwitchComp);
