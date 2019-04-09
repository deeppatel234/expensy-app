import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Text, View } from 'react-native';
import { Link } from 'react-router-native'


class HomePage extends Component {
  render() {
    const {
      user,
    } = this.props;

    return (
      <View>
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
