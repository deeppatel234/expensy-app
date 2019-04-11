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
    const { fetchUser, fetchCategories } = this.props;
    fetchUser();
    fetchCategories();
  }

  render() {
    const { isLoading, isError } = this.props;

    if (isLoading) {
      return <Text>fetching user or categories....</Text>;
    }

    if (isError) {
      return <Text>Error fetch user or categories</Text>;
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
    isLoading: state.userLoadingStatus === 'IN_PROGRESS' || state.categoriesLoadingStatus === 'IN_PROGRESS',
    isError: state.userLoadingStatus === 'ERROR' || state.categoriesLoadingStatus === 'ERROR',
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(Redux.get('user', 'fetch')()),
    fetchCategories: () => dispatch(Redux.get('categories', 'fetch')()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
