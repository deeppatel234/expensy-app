import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Text } from 'react-native';

import Redux from './redux/ReduxRegistry';

class HomePage extends Component {
  componentDidMount() {
    const { fetchUser } = this.props;
    fetchUser();
  }

  render() {
    const {
      user,
      userLoadingStatus,
    } = this.props;

    if (userLoadingStatus === 'IN_PROGRESS') {
      return <Text>Loading....</Text>;
    }

    if (userLoadingStatus === 'ERROR') {
      return <Text>Error fetch user</Text>;
    }

    return (
      <Text>Hello {user.firstname}</Text>
    );
  }
}

// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    user: state.user,
    userLoadingStatus: state.userLoadingStatus,
    projectLoadingStatus: state.projectLoadingStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(Redux.get('user', 'fetchData')()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
