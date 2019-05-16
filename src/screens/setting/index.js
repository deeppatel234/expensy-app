import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Modal,
  TouchableHighlight,
} from 'react-native';

import TypoGraphy from 'Components/TypoGraphy';
import Avatar from 'Components/Avatar';
import Icon from 'Components/Icon';
import Switch from 'Components/Switch';
import Header from 'Components/Header';

import IconList from 'Utils/IconList';

import {
  Container,
  Heading,
  Content
} from 'Src/globalStyle';



class Setting extends Component {
  render() {
    return (
      <Container>
        <Heading>
          <Header text="Settings" />
        </Heading>
        <Content>
          <Switch value={false} />
        </Content>
      </Container>
    )
  }
}

// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(Setting);
