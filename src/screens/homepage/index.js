import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Text } from 'react-native';
import { Link } from 'react-router-native';

import Redux from "Redux/ReduxRegistry";
import Button from 'Components/Button';

import { Container } from '../../../globalStyle';

class HomePage extends Component {
  render() {
    const {
      user,
      openMenuDrawer,
    } = this.props;

    return (
      <Container>
        <Button
          onPress={openMenuDrawer}
          text="Open"
          appearance="primary"
        />
        <Text>Hello {user.firstname} {user.lastname}</Text>
        <Link to='/create-category'><Text>Create Category</Text></Link>
        <Link to='/view-category'><Text>View Category</Text></Link>
        <Link to='/create-wallet'><Text>Create Wallet</Text></Link>
        <Link to='/view-wallet'><Text>View Wallet</Text></Link>
        <Link to='/create-expense'><Text>Create Expense</Text></Link>
      </Container>
    );
  }
}

// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    user: state.user,
    categories: state.categories,
    wallets: state.wallets,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openMenuDrawer: () => dispatch(Redux.get("setting", "changeMenuDrawerVisibility")(true)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
