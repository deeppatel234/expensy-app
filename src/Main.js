import React, { Component } from "react";
import { NativeRouter, Route, Switch, BackButton } from "react-router-native";
import { connect } from "react-redux";
import Drawer from 'react-native-drawer';

import { Text } from "react-native";

import HomePage from "./screens/homepage";
import CreateCategory from "./screens/category/CreateCategory";
import ViewCategory from "./screens/category/ViewCategory";

import CreateWallet from "./screens/wallet/CreateWallet";
import ViewWallet from "./screens/wallet/ViewWallet";

import CreateExpense from "./screens/expense/CreateExpense";

import Menu from "./screens/menu";

import Redux from "Redux/ReduxRegistry";
import models from "./sql/models";

import { drawerStyles } from '../globalStyle';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSync: true
    };
  }

  componentDidMount() {
    const {
      fetchUser,
      fetchCategories,
      fetchNetwork,
      fetchWallets
    } = this.props;
    fetchNetwork().then(() => {
      models.syncTables(false).then(() => {
        this.setState({ isSync: false });
        fetchUser();
        fetchCategories();
        fetchWallets();
      });
    });
  }

  render() {
    const { isLoading, isError, isDrawerOpen, closeMenuDrawer } = this.props;
    const { isSync } = this.state;

    if (isSync) {
      return <Text>Sync.....</Text>;
    }

    if (isLoading) {
      return <Text>fetching user or categories....</Text>;
    }

    if (isError) {
      return <Text>Error fetch user or categories</Text>;
    }

    return (
      <Drawer
        tapToClose
        open={isDrawerOpen}
        type="static"
        content={<Menu />}
        openDrawerOffset={100}
        styles={drawerStyles}
        tweenHandler={Drawer.tweenPresets.parallax}
        onClose={closeMenuDrawer}
      >
        <NativeRouter>
          <BackButton>
            <Switch>
              <Route path="/view-category" component={ViewCategory} />
              <Route path="/create-category" component={CreateCategory} />
              <Route path="/view-wallet" component={ViewWallet} />
              <Route path="/create-wallet" component={CreateWallet} />
              <Route path="/create-expense" component={CreateExpense} />
              <Route path="/" exact component={HomePage} />
            </Switch>
          </BackButton>
        </NativeRouter>
      </Drawer>
    );
  }
}

// Maps state from store to props
const mapStateToProps = state => {
  return {
    isLoading:
      state.userLoadingStatus === "IN_PROGRESS" ||
      state.categoriesLoadingStatus === "IN_PROGRESS" ||
      state.walletsLoadingStatus === "IN_PROGRESS",
    isError:
      state.userLoadingStatus === "ERROR" ||
      state.categoriesLoadingStatus === "ERROR" ||
      state.walletsLoadingStatus === "ERROR",
    isDrawerOpen: state.setting.isDrawerOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(Redux.get("user", "fetch")()),
    fetchCategories: () => dispatch(Redux.get("category", "fetch")()),
    fetchWallets: () => dispatch(Redux.get("wallet", "fetch")()),
    fetchNetwork: () => dispatch(Redux.get("network", "fetch")()),
    closeMenuDrawer: () => dispatch(Redux.get("setting", "changeMenuDrawerVisibility")(false)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
