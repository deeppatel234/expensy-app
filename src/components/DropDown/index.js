import React from 'react';

import {
  Picker,
  PickerWrapper
} from './styled';

const DropDown = ({ options, ...props }) => {
  return (
    <PickerWrapper>
      <Picker {...props}>
        {
          options.map(o => <Picker.Item key={o.value} label={o.text} value={o.value} />)
        }
      </Picker>
    </PickerWrapper>
  )
}

export default DropDown;
