import React, { Component } from "react";
import { RadioGroupProvider } from "./RadioGroupContext";

import { RadioGroupWrapper } from "./styled";

class RadioGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: props.selectedValue || props.defaultValue
    };
    this.onChangeRadioButton = this.onChangeRadioButton.bind(this);
  }

  onChangeRadioButton(value) {
    const { selectedValue } = this.props;
    if (selectedValue) {
      this.triggerOnchange(value);
    } else {
      this.setState({ selectedValue: value }, () =>
        this.triggerOnchange(value)
      );
    }
  }

  triggerOnchange(value) {
    const { onChange, data } = this.props;
    if (onChange) {
      onChange(value, data);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedValue !== this.props.selectedValue) {
      this.setState({ selectedValue: nextProps.selectedValue });
    }
  }

  render() {
    const { children } = this.props;

    const { selectedValue } = this.state;

    return (
      <RadioGroupProvider
        value={{
          selectedValue,
          onChange: this.onChangeRadioButton
        }}
      >
        <RadioGroupWrapper>{children}</RadioGroupWrapper>
      </RadioGroupProvider>
    );
  }
}

export default RadioGroup;
