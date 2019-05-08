import React from 'react';

import { RadioGroupConsumer } from './RadioGroupContext';

import Button from 'Components/Button';

/*
  Example:

  <Radio.Group defaultValue="2" onChange={(p) => this.onChangeRadio(p)}>
    <Radio.Button value="1" text="One" />
    <Radio.Button value="2" text="Two" />
    <Radio.Button value="3" text="Three" />
  </Radio.Group>
*/

const RadioButton = (props) => {
  const {
    value,
    ...restProps
  } = props;

  return (
    <RadioGroupConsumer>
      {
        ({
          onChange,
          selectedValue,
        }) => {
          const appearance = (selectedValue === value) ? 'primary' : 'default';

          return (
            <Button appearance={appearance} onPress={() => onChange(value)} {...restProps} />
          )
        }
      }
    </RadioGroupConsumer>
  );
};

export default RadioButton;

