import React, { Component } from 'react';

import SplashLoading from "Screens/splash/SplashLoading";
import Redux from "Redux/ReduxRegistry";

class ReduxLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    const { models } = this.props;
    Promise.all(models.map(model => Redux.get(model, "fetch")()))
      .then(() => this.setState({ isLoaded: true }));
  }

  render() {
    const { children } = this.props;
    const { isLoaded } = this.state;

    if(isLoaded) {
      return children;
    }

    return <SplashLoading />;
  }
}

export default ReduxLoader
