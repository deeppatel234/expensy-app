import React from 'react';

import DatePicker from 'react-native-datepicker';

import { TYPO_STYLE } from 'Components/TypoGraphy';

export default ({ date, onDateChange }) => {
  return (
    <DatePicker
      date={date}
      placeholder="Select Date"
      format="DD/MM/YYYY"
      onDateChange={onDateChange}
      showIcon={false}
      customStyles={{
        dateInput:{
          borderWidth: 0,
          alignItems: 'flex-start',
        },
        dateText: TYPO_STYLE.default,
      }}
    />
  )
};
