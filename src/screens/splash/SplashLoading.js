import React from 'react';

import TypoGraphy from "Components/TypoGraphy";
import Loader from "Components/Loader";

import {
  Wrapper,
  AppNameWrapper,
  LoadingWrapper,
  FooterWrapper,
} from './style';

const SplashLoading = ({ message }) => {
  return (
    <Wrapper>
      <AppNameWrapper>
        <TypoGraphy type="appLogo" appearance="white">Expensy</TypoGraphy>
      </AppNameWrapper>
      <LoadingWrapper>
        { message && (
          <React.Fragment>
            <Loader color="white" />
            <TypoGraphy appearance="white">{message}</TypoGraphy>
          </React.Fragment>
        )}
      </LoadingWrapper>
      <FooterWrapper>
        <TypoGraphy appearance="white">Your Personal expense manager</TypoGraphy>
      </FooterWrapper>
    </Wrapper>
  );
};

export default SplashLoading;
