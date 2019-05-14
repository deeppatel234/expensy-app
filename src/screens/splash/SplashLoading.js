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
        <Loader color="white" />
        <TypoGraphy appearance="white">{message}</TypoGraphy>
      </LoadingWrapper>
      <FooterWrapper>
        <TypoGraphy appearance="white">Your Personal expense manager</TypoGraphy>
      </FooterWrapper>
    </Wrapper>
  );
};

export default SplashLoading;
