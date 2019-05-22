import React from "react";
import { withTheme } from "styled-components";
import { SwitchComp } from "./style";
import { LightenDarkenColor } from 'Utils/utility';

import { PRIMARY } from 'Src/theme';

const Switch = ({ theme, ...props }) => {
  const lightenColor = LightenDarkenColor(PRIMARY, 30);
  return (
    <SwitchComp
      trackColor={{ true: lightenColor,  false: lightenColor }}
      thumbColor={theme.primary}
      {...props}
    />
  );
};

Switch.defaultProps = {
  appearance: "default"
};

export default withTheme(Switch);
