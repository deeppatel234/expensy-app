import React from 'react';

import { TouchableHighlight } from 'react-native';

import Typography from 'Components/Typography';
import Modal from 'Components/Modal';

import CurrencyCode from 'Utils/CurrencyCode';

import { Content, ListWrapper, ListItem, ListDetails } from 'Src/globalStyle';


const CurrencyModal = ({ visible, onClose, onSelect }) => (
  <Modal visible={visible} onClose={onClose} heading="Currency">
    <Content>
      <ListWrapper>
        {Object.keys(CurrencyCode).map(code => (
          <TouchableHighlight key={code} onPress={() => onSelect(code)}>
            <ListItem>
              <ListDetails>
                <Typography>{CurrencyCode[code].name}</Typography>
                <Typography type="small">
                  {CurrencyCode[code].unicode}
                </Typography>
              </ListDetails>
            </ListItem>
          </TouchableHighlight>
        ))}
      </ListWrapper>
    </Content>
  </Modal>
);

export default CurrencyModal;
