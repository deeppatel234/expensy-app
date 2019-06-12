import React from "react";

import { RadioGroupConsumer } from "./RadioGroupContext";

import Badge from "Components/Badge";
import Typography from "Components/Typography";

import { RadioBadge } from "./styled";

/*
  Example:

  <Radio.Group defaultValue="2" onChange={(p) => this.onChangeRadio(p)}>
    <Radio.Badge value="1" text="One" />
    <Radio.Badge value="2" text="Two" />
    <Radio.Badge value="3" text="Three" />
  </Radio.Group>
*/

const RadioButton = ({ value, text, ...props }) => (
  <RadioGroupConsumer>
    {({ onChange, selectedValue, multiple }) => {
      const isSelected = multiple ? selectedValue.includes(value) : selectedValue === value;
      return (
        <RadioBadge onPress={() => onChange(value)}>
          <Badge
            appearance={isSelected ? "primary" : "white"}
            {...props}
          >
            <Typography
              appearance={isSelected ? "white" : "primary"}
            >
              {text}
            </Typography>
          </Badge>
        </RadioBadge>
      );
    }}
  </RadioGroupConsumer>
);

export default RadioButton;
