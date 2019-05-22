import React from "react";

import { RadioGroupConsumer } from "./RadioGroupContext";

import Button from "Components/Button";

/*
  Example:

  <Radio.Group defaultValue="2" onChange={(p) => this.onChangeRadio(p)}>
    <Radio.Button value="1" text="One" />
    <Radio.Button value="2" text="Two" />
    <Radio.Button value="3" text="Three" />
  </Radio.Group>
*/

const RadioButton = ({ value, ...props }) => (
  <RadioGroupConsumer>
    {({ onChange, selectedValue }) => (
      <Button
        appearance={selectedValue === value ? "primary" : "black"}
        onPress={() => onChange(value)}
        {...props}
      />
    )}
  </RadioGroupConsumer>
);

export default RadioButton;
