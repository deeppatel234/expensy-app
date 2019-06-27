import React from "react";

import Typography from "Components/Typography";
import Loader from "Components/Loader";

import {
  Wrapper,
  AppNameWrapper,
  LoadingWrapper,
  FooterWrapper
} from "./styled";

const SplashLoading = ({ message }) => (
  <Wrapper>
    <AppNameWrapper>
      <Typography type="appLogo" color="white">
        Expensy
      </Typography>
    </AppNameWrapper>
    <LoadingWrapper>
      {message && (
        <React.Fragment>
          <Loader color="white" />
          <Typography color="white">{message}</Typography>
        </React.Fragment>
      )}
    </LoadingWrapper>
    <FooterWrapper>
      <Typography color="white">Your Personal expense manager</Typography>
    </FooterWrapper>
  </Wrapper>
);

export default SplashLoading;
