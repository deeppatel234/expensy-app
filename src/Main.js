import React, { Component } from 'react';
import {
  NativeRouter,
  Route,
  Switch,
  BackButton,
} from "react-router-native";
import { connect } from 'react-redux';

import { View, Text } from 'react-native';

import HomePage from './screens/homepage';
import CreateCategory from './screens/category/CreateCategory';
import ViewCategory from './screens/category/ViewCategory';

import Redux from './redux/ReduxRegistry';
import models from './sql/models'

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSync: true,
    };
  }

  componentDidMount() {
    const { fetchUser, fetchCategories, fetchNetwork } = this.props;
    fetchNetwork().then(() => {
      models.syncTables(false).then(() => {
        this.setState({ isSync: false })
        fetchUser();
        fetchCategories();
      });
    });
  }

  render() {
    const { isLoading, isError } = this.props;
    const { isSync } = this.state;

    if (isSync) {
       return <Text>Sync.....</Text>
    }

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
    fetchCategories: () => dispatch(Redux.get('category', 'fetch')()),
    fetchNetwork: () => dispatch(Redux.get('network', 'fetch')()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
