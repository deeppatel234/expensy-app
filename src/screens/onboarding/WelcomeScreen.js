import React from "react";
import { connect } from "react-redux";

import Typography from "Components/Typography";
import Button from "Components/Button";

import { PRIMARY } from "Src/theme";

import { WelcomeWrapper, HelloText, WelcomeText, FooterButton } from "./styled";

const WelcomePage = ({ onDone }) => (
  <WelcomeWrapper>
    <HelloText>
      <Typography type="appLogo">Hello</Typography>
    </HelloText>
    <WelcomeText>
      <Typography type="title" color={PRIMARY} size={25}>
        Welcome to Expensy
      </Typography>
    </WelcomeText>
    <FooterButton>
      <Button
        onPress={onDone}
        appearance="primary"
        text="Let's Start"
        borderRadius
        block
      />
    </FooterButton>
  </WelcomeWrapper>
);

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(WelcomePage);
