import React, { useEffect } from "react";
import { Route, Switch, BackButton } from "react-router-native";
import { connect } from "react-redux";
import Drawer from "react-native-drawer";

import Dashboard from "Screens/dashboard";
import CreateCategory from "Screens/category/CreateCategory";
import CategoryList from "Screens/category/CategoryList";
import EditCategory from "Screens/category/EditCategory";

import CreateWallet from "Screens/wallet/CreateWallet";
import ViewWallet from "Screens/wallet/ViewWallet";

import CreateExpense from "Screens/expense/CreateExpense";
import Setting from "Screens/setting";
import InitSyncScreen from "Screens/onboarding/SyncScreen";
import ReduxLoader from "Base/ReduxLoader";

import Menu from "Screens/menu";

import Redux from "Redux/ReduxRegistry";

const Main = ({
  isDrawerOpen,
  closeMenuDrawer,
  initSyncComplete,
  syncComplete,
  startSync
}) => {
  useEffect(() => {
    if (!syncComplete) {
      startSync();
    }
  }, []);

  if (!initSyncComplete) {
    return <InitSyncScreen />;
  }

  return (
    <ReduxLoader models={["setting"]}>
      <ReduxLoader models={["wallet", "category", "user"]}>
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
              <Route path="/view-category" component={CategoryList} />
              <Route path="/edit-category/:id" component={EditCategory} />
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
    </ReduxLoader>
  );
};

// Maps state from store to props
const mapStateToProps = state => {
  return {
    isDrawerOpen: state.setting.isDrawerOpen,
    initSyncComplete: state.sync.initSyncComplete,
    syncComplete: state.sync.syncComplete
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeMenuDrawer: () =>
      dispatch(Redux.get("setting", "changeMenuDrawerVisibility")(false)),
    startSync: () => dispatch(Redux.get("sync", "startSync")())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
