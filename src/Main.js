import React, { Component } from 'react';
import {
  NativeRouter,
  Route,
  Switch,
  BackButton,
} from "react-router-native";
import { connect } from 'react-redux';

import { View, Text } from 'react-native';

import HomePage from './HomePage';
import CreateCategory from './screens/category/CreateCategory';
import ViewCategory from './screens/category/ViewCategory';

import Redux from './redux/ReduxRegistry';

class Main extends Component {
  componentDidMount() {
    const { fetchUser } = this.props;
    fetchUser();
  }

  render() {
    const { userLoadingStatus } = this.props;

    if (userLoadingStatus === 'IN_PROGRESS') {
      return <Text>fetching user....</Text>;
    }

    if (userLoadingStatus === 'ERROR') {
      return <Text>Error fetch user</Text>;
    }

    return (
      <NativeRouter>
        <BackButton>
          <View>
            <Switch>
              <Route path="/view-category" component={ViewCategory} />
              <Route path="/create-category" component={CreateCategory} />
              <Route path="/" exact component={HomePage} />
            </Switch>
          </View>
        </BackButton>
      </NativeRouter>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
