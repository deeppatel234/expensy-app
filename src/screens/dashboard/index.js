import React, { Component } from 'react';
import { connect } from 'react-redux';

import Redux from "Redux/ReduxRegistry";
import Header from 'Components/Header';

import { Container, Heading, Content } from 'Src/globalStyle';

class Dashboard extends Component {
  render() {
    const {
      user,
    } = this.props;

    return (
      <Container>
        <Heading>
          <Header text="Dashboard" />
        </Heading>
        <Content>

        </Content>
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


export default connect(mapStateToProps)(Dashboard);
