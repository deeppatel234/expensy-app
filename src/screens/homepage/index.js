import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Text, View } from 'react-native';
import { Link } from 'react-router-native';

import models from '../../sql/models'

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSync: true,
    };
  }

  componentDidMount() {
    models.syncTables().then(() => this.setState({ isSync: false }));
  }

  render() {
    const {
      user,
    } = this.props;

    const { isSync } = this.state;

    return (
      <View>
        <Text>{isSync ? 'Sync.....' : 'Sync Successfull'}</Text>
        <Text>Hello {user.firstname} {user.lastname}</Text>
        <Link to='/create-category'><Text>Create Category</Text></Link>
        <Link to='/view-category'><Text>View Category</Text></Link>
      </View>
    );
  }
}

// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(HomePage);
