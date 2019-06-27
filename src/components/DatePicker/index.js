import React from "react";
import { withTheme } from "styled-components";

import DatePicker from "react-native-datepicker";

import { TYPO_STYLE } from "Components/Typography";

const Date = ({ date, onDateChange, color, theme, appearance }) => (
  <DatePicker
    date={date}
    placeholder="Select Date"
    format="YYYY-MM-DD"
    onDateChange={onDateChange}
    showIcon={false}
    customStyles={{
      dateInput: {
        borderWidth: 0,
        alignItems: "flex-start"
      },
      dateText: { ...TYPO_STYLE.default, color: color ? theme.brand[color] : theme[appearance] }
    }}
  />
);

Date.defaultProps = {
  appearance: "black",
  color: false
};

export default withTheme(Date);
