import React from "react";
import Svg, { Path } from "react-native-svg";
import { withTheme } from "styled-components";

import Typography from "Components/Typography";

import { Wrapper } from "./styled";

const Empty = ({ color, appearance, theme }) => (
  <Wrapper>
    <Svg
      height="160px"
      width="160px"
      fill={color ? theme.brand[color] : theme[appearance]}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      x="0px"
      y="0px"
    >
      <Path d="M7.50006,86.50006H92.49994A2.49982,2.49982,0,0,0,95,84.00006V55.43268a2.50966,2.50966,0,0,0-.13477-.80957L81.36591,15.19049a2.49976,2.49976,0,0,0-2.36524-1.69043H21.00037a2.49982,2.49982,0,0,0-2.3653,1.69043L5.13477,54.62311A2.50745,2.50745,0,0,0,5,55.43268V84.00006A2.49986,2.49986,0,0,0,7.50006,86.50006Zm15.2865-68H77.21448L89.00061,52.92975H10.99939Z" />
    </Svg>
    <Typography appearance="gray">No Records</Typography>
  </Wrapper>
);

Empty.defaultProps = {
  color: "lightGray"
};

export default withTheme(Empty);
