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
import Setting from "Screens/setting";
import ReduxLoader from 'Base/ReduxLoader';

import Menu from "Screens/menu";

import Redux from "Redux/ReduxRegistry";

const Main = ({ isDrawerOpen, closeMenuDrawer }) => (
  <ReduxLoader models={['wallet', 'category', 'user']}>
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
          <Route path="/setting" component={Setting} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Drawer>
    </BackButton>
  </ReduxLoader>
);

// Maps state from store to props
const mapStateToProps = state => {
  return {
    isDrawerOpen: state.setting.isDrawerOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeMenuDrawer: () => dispatch(Redux.get("setting", "changeMenuDrawerVisibility")(false)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
