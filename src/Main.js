import React, { Component } from "react";
import { NativeRouter, Route, Switch, BackButton } from "react-router-native";
import { connect } from "react-redux";
import Drawer from 'react-native-drawer';

import Dashboard from "Screens/dashboard";
import CreateCategory from "Screens/category/CreateCategory";
import ViewCategory from "Screens/category/ViewCategory";

import CreateWallet from "Screens/wallet/CreateWallet";
import ViewWallet from "Screens/wallet/ViewWallet";

import CreateExpense from "Screens/expense/CreateExpense";
import SplashLoading from "Screens/splash/SplashLoading";

import Menu from "Screens/menu";

import Redux from "Redux/ReduxRegistry";
import models from "Src/sql/models";


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
      return <SplashLoading message="Syncing data" />;
    }

    if (isLoading) {
      return <SplashLoading message="Loading data" />;
    }

    if (isError) {
      return <SplashLoading message="Error Fetching Data" />;
    }

    return (
      <NativeRouter>
        <BackButton>
          <Drawer
            tapToClose
            open={isDrawerOpen}
            type="static"
            content={<Menu />}
            openDrawerOffset={100}
            tweenDuration={150}
            tweenHandler={Drawer.tweenPresets.parallax}
            onClose={closeMenuDrawer}
          >
            <Switch>
              <Route path="/view-category" component={ViewCategory} />
              <Route path="/create-category" component={CreateCategory} />
              <Route path="/view-wallet" component={ViewWallet} />
              <Route path="/create-wallet" component={CreateWallet} />
              <Route path="/create-expense" component={CreateExpense} />
              <Route path="/" exact component={Dashboard} />
            </Switch>
          </Drawer>
        </BackButton>
      </NativeRouter>
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
